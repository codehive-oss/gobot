import { Message } from "discord.js";
import { Command } from "../../utils/commandTypes";

const cmd = new Command({
  async execute(msg: Message, _args: string[]) {
    await msg.reply("Alles Klar");
  },
  name: "scheismalaufquicksort",
  aliases: ["smaqs"],
  description: "taha bester mann",
});

module.exports = cmd;
