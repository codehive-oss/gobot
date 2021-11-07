import { Command } from "../utils/types";
import { Message } from "discord.js";
import { tools } from "../utils/tools";
import {
  decrementHandBalance,
  giveTool,
  hasTool,
  toGoUser,
} from "../db/entity/GoUser";

const cmd: Command = {
  description: "Buys the specified item",
  async execute(msg: Message, args: string[]) {
    if (args.length < 1) {
      await msg.reply("Please provide an Item!");
      return;
    }
    const itemname = args[0];
    let tool;

    for (const item of tools) {
      if (item.name.toLocaleLowerCase() === itemname.toLocaleLowerCase()) {
        tool = item;
        break;
      }
    }
    if (tool === undefined) {
      await msg.reply("Tool not found");
      return;
    }

    const gouser = await toGoUser(msg.author);
    if (gouser.handBalance < tool.price) {
      await msg.reply("You dont have enough money on your hand to buy this!");
      return;
    }

    if (await hasTool(gouser, tool.id)) {
      await msg.reply("You already have that tool");
      return;
    }
    await giveTool(gouser, 0);
    await decrementHandBalance(gouser, tool.price);
    await msg.reply(`Succesfully bought ${tool.name} for ${tool.price}`);
  },
  name: "buy",
  usage: "buy [item]",
};

module.exports = cmd;
