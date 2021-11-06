import { Message, MessageEmbed } from "discord.js";
import { client } from "../utils/client";
import { commands } from "../utils/commandHandler";
import { Command } from "../utils/types";

const cmd: Command = {
  name: "help",
  description: "Shows all commands",
  aliases: ["commands"],
  async execute(msg: Message, _args: string[]) {
    const embed = new MessageEmbed();
    embed.setColor("#528B8B");
    embed.setTitle(":books: Command Info ");
    if (client.user?.avatarURL()) {
      embed.setThumbnail(client.user.avatarURL()!);
    }
    for (const command of commands) {
      embed.addField(":ice_cube: " + command.name, command.description);
    }
    await msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
