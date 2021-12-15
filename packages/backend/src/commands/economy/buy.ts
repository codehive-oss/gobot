import { Command } from "../../utils/commandTypes";
import { Message } from "discord.js";
import { tools } from "../../utils/tools";
import {
  decrementHandBalance,
  giveTool,
  hasTool,
  toGoUser,
} from "../../db/entities/GoUser";

const cmd = new Command({
  name: "buy",
  description: "Buys the specified item",
  usage: "buy [item]",
  category: "economy",
  async execute(msg: Message, args: string[]) {
    if (args.length < 1) {
      await msg.reply("Please provide an Item!");
      return;
    }
    const itemname = args[0];
    let item;

    for (const tool of tools) {
      if (tool.name.toLocaleLowerCase() === itemname.toLocaleLowerCase()) {
        item = tool;
        break;
      }
    }

    if (item === undefined) {
      await msg.reply("Tool not found");
      return;
    }

    const gouser = await toGoUser(msg.author.id);
    if (gouser.handBalance < item.price) {
      await msg.reply("You dont have enough money on your hand to buy this!");
      return;
    }

    if (await hasTool(gouser, item.id)) {
      await msg.reply("You already have that tool");
      return;
    }
    await giveTool(gouser, 0);
    await decrementHandBalance(gouser, item.price);
    await msg.reply(`Succesfully bought ${item.name} for ${item.price}`);
  },
});

module.exports = cmd;
