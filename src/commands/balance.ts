import { Command } from "../utils/types";
import { Message } from "discord.js";
import { createUser, upsert } from "../db/entity/GoUser";

const cmd: Command = {
  aliases: ["bal"],
  name: "balance",
  description: "Shows your current balance",
  async execute(msg: Message, args: string[]) {
    if (!args[0]) {
      //own balance

      const goUser = await upsert(msg.author);
      const balance = goUser.balance;
      await msg.reply("Your balance: " + balance + "$");
    } else {
      // someone elses balance
    }
  },
};

module.exports = cmd;
