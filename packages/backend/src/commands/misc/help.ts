import {
  Message,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  MessageSelectOptionData,
  SelectMenuInteraction,
  TextChannel,
} from "discord.js";
import { client } from "../../utils/client";
import { commands } from "../../utils/commandHandler";
import { Command } from "../../utils/commandTypes";
import { allCategoryData, Categories } from "../../utils/categoryTypes";
import { capitalizeFirstLetter } from "../../utils/capitalize";
import Pagination from "../../utils/Pagination";
import { mention } from "../../utils/mention";
import { GoServer } from "../../db/entities/GoServer";

const cmd = new Command({
  name: "help",
  description: "Shows all commands",
  aliases: ["commands"],
  usage: "help <command>",
  category: "misc",
  async execute(msg: Message, args: string[], server: GoServer) {
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
      
      const menu = await msg.reply({
        content: "Select a Category to see help for",
        components: [row],
      });

      const interactionCollector = menu.createMessageComponentCollector();
      interactionCollector.on(
        "collect",
        async (interaction: SelectMenuInteraction) => {
          console.log(interaction.values[0]);
          const commandsPerPage = 10;
          const category = interaction.values[0] as Categories;
          const categoryCommands = commands.filter(
            (c) => c.category == category
          );
          const pages: MessageEmbed[] = [];
          const amount = Math.ceil(categoryCommands.length / commandsPerPage);
          console.log(amount);
          const prefix = server.prefix;

          for (let i = 0; i < amount; i++) {
            const embed = new MessageEmbed();
            embed.setTitle(":books: Category Info [" + category + "]");
            embed.setColor("#528B8B");
            if (client.user?.avatarURL()) {
              embed.setThumbnail(client.user.avatarURL()!);
            }
            for (
              let j = i * commandsPerPage;
              j < i * commandsPerPage + commandsPerPage;
              j++
            ) {
              if (
                categoryCommands[
                  i * commandsPerPage + (j - commandsPerPage * i)
                ]
              )
                embed.addField(
                  prefix +
                    categoryCommands[
                      i * commandsPerPage + (j - commandsPerPage * i)
                    ].name,
                  categoryCommands[
                    i * commandsPerPage + (j - commandsPerPage * i)
                  ].description
                );
            }
            if (embed.fields.length) pages.push(embed);
          }
          await interaction.reply({
            content: mention(interaction.user.id),
          });
          new Pagination(interaction.channel as TextChannel, pages).paginate();
        }
      );
    } else {
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
    }
  },
});

export default cmd;
