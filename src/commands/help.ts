import { Message, MessageEmbed } from "discord.js";
import { client } from "../utils/client";
import { commands } from "../utils/commandHandler";
import { Command } from "../utils/types";

const cmd: Command = {
  name: "help",
  description: "Shows all commands",
  aliases: ["commands"],
  usage: "help <command>",
  async execute(msg: Message, args: string[]) {
    const embed = new MessageEmbed();
    embed.setColor("#528B8B");
    if (client.user?.avatarURL()) {
      embed.setThumbnail(client.user.avatarURL()!);
    }
    if (args[0]) {
      const commandName = args[0];
      var command: Command | undefined;

      for (const cmd of commands) {
        if (
          cmd.name === commandName ||
          (cmd.aliases && cmd.aliases.includes(commandName))
        ) {
          command = cmd;
        }
      }

      if (!command) {
        msg.reply("Command not found");
        return;
      }
      embed.setTitle(`${command.name} Info`);
      embed.addField(command.name, command.description, false);
      if (command.usage) {
        embed.addField("Usage", command.usage);
      }
      if (command.aliases) {
        embed.addField("Aliases", command.aliases.join("\n"));
      }
    } else {
      embed.setTitle(":books: Command Info ");
      const emoji = client.emojis.cache.find((e) => e.name === "gobot");
      for (const command of commands) {
        embed.addField(`${emoji} ${command.name}`, command.description);
      }
    }
    await msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
