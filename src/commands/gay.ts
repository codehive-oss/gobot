import { Command } from "../utils/types";
import { Message } from "discord.js";

const cmd: Command = {
  aliases: ["howgay"],
  name: "gay",
  description: "tells you how gay you are",
  async execute(msg: Message, _args: string[]) {
    const rate = Math.round(Math.random() * 100);

    await msg.reply("You are " + rate + "% gey");
  }
};

module.exports = cmd;
