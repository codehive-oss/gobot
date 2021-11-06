import { Command } from "../types";
import { Message } from "discord.js";

const cmd: Command = {
  aliases: ["dong"],
  name: "dongsize",
  description: "magnum schlong",
  async execute(msg: Message, _args: string[]) {
    const random = Math.round(Math.random() * 100);
    let dong = "8";

    for (let i = 0; i < random; i++) {
      dong += "=";
    }
    await msg.reply((dong += "D " + random + "cm"));
  }
};

module.exports = cmd;
