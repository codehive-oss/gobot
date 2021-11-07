import { Message, MessageEmbed } from "discord.js";
import { client } from "../utils/client";
import { commands } from "../utils/commandHandler";
import { Command } from "../utils/types";

const cmd: Command = {
  name: "help",
  description: "Shows all commands",
  aliases: ["commands"],
  async execute(msg: Message, args: string[]) {
    const embed = new MessageEmbed();
    embed.setColor("#528B8B");
    if (client.user?.avatarURL()) {
      embed.setThumbnail(client.user.avatarURL()!);
    }
    if (args[0]) {
      embed.setTitle(`${args[0]} Info`);
      const command = commands.find((c) => c.name === args[0]);
      if (!command) {
        embed.setDescription(`Command ${args[0]} not found`);
        return;
      }
      embed.addField(command.name, command.description);
      if (command.usage) {
        embed.addField("Usage", command.usage);
      }
    } else {
      embed.setTitle(":books: Command Info ");
      for (const command of commands) {
        embed.addField(":ice_cube: " + command.name, command.description);
      }
    }
    await msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
