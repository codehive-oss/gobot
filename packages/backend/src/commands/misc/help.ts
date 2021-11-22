import {
  Message,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  MessageSelectOptionData,
} from "discord.js";
import { client } from "../../utils/client";
import { commands } from "../../utils/commandHandler";
import { Command, SelectMenu } from "../../utils/commandTypes";
import { allCategoryData, Categories } from "../../utils/categoryTypes";
import { capitalizeFirstLetter } from "../../utils/capitalize";

const cmd: Command & SelectMenu = {
  name: "help",
  description: "Shows all commands",
  aliases: ["commands"],
  usage: "help <command>",
  category: "misc",
  async execute(msg: Message, args: string[]) {
    if (args.length === 0) {
      const options: MessageSelectOptionData[] = [];
      for (let name in allCategoryData) {
        const data = allCategoryData[name as keyof typeof allCategoryData];
        options.push({
          label: capitalizeFirstLetter(name),
          value: name,
          description: data.description,
        });
      }

      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId(this.name)
          .setPlaceholder("Category")
          .addOptions(options)
      );
      await msg.reply({
        content: "Select a Category to see help for",
        components: [row],
      });
      return;
    }

    const embed = new MessageEmbed();
    embed.setColor("#528B8B");
    if (client.user?.avatarURL()) {
      embed.setThumbnail(client.user.avatarURL()!);
    }

    if (args[0]) {
      const commandName = args[0];
      let command: Command | undefined;

      for (const cmd of commands) {
        if (
          cmd.name === commandName ||
          (cmd.aliases && cmd.aliases.includes(commandName))
        ) {
          command = cmd;
        }
      }

      if (!command) {
        await msg.reply("Command not found");
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
  handleInteraction: async (interaction) => {
    const category = interaction.values[0] as Categories;

    const embed = new MessageEmbed();
    embed.setColor("#528B8B");
    embed.setTitle(":books: Category Info [" + category + "]");
    if (client.user?.avatarURL()) {
      embed.setThumbnail(client.user.avatarURL()!);
    }

    const emoji = client.emojis.cache.find((e) => e.name === "gobot");

    for (const command of commands) {
      if (command.category === category) {
        embed.addField(`${emoji} ${command.name}`, command.description);
      }
    }

    await interaction.reply({
      ephemeral: true,
      content: `<@${interaction.user.id}>`,
      embeds: [embed],
    });
  },
};

module.exports = cmd;
