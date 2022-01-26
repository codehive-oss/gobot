import { Command } from "@utils/commandTypes/Command";
import { Message } from "discord.js";

const cmd = new Command({
  aliases: ["gaytest"],
  name: "howgay",
  category: "misc",
  description: "tells you how gay you are",
  async execute(msg: Message, _args: string[]) {
    const rate = Math.round(Math.random() * 100);

    await msg.reply("You are " + rate + "% gay");
  },
});

export default cmd;
