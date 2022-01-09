import { Command } from "@utils/commandTypes/Command";
import {
  Message,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  SelectMenuInteraction,
} from "discord.js";
import { GoUser } from "@db/entities/GoUser";
import { client } from "@core/client";
import { mention } from "@utils/mention";

const cmd = new Command({
  name: "leaderboard",
  category: "level",
  usage: "leaderboard",
  description: "Shows the Users with the Most Experience",
  async execute(msg: Message, args: string[]) {
    if (args.length > 0) {
      switch (args[0].toLowerCase()) {
        case "xp":
          await msg.reply({
            embeds: [await getXpLeaderboard()],
          });
          break;
        case "msg":
          await msg.reply({
            embeds: [await getMessageLeaderboard()],
          });
          break;
        default:
          break;
      }
    }
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId(this.name)
        .setPlaceholder("Category")
        .addOptions([
          {
            label: "XP",
            value: "xp",
            description: "Leaderboard basen on Experience",
          },
          {
            label: "Messages",
            value: "msg",
            description: "Leaderboard basen on Messages",
          },
        ])
    );
    const menu = await msg.reply({
      content: "Select Which Leaderboard you would like to view",
      components: [row],
    });

    const interactionCollector = menu.createMessageComponentCollector();
    interactionCollector.on(
      "collect",
      async (interaction: SelectMenuInteraction) => {
        switch (interaction.values[0]) {
          case "xp":
            await interaction.reply({
              content: mention(interaction.user.id),
              embeds: [await getXpLeaderboard()],
            });
            break;
          case "msg":
            await interaction.reply({
              content: mention(interaction.user.id),
              embeds: [await getMessageLeaderboard()],
            });
            break;
          default:
            await interaction.reply("Error");
        }
      }
    );
  },
});

async function getXpLeaderboard() {
  const embed = new MessageEmbed().setTitle("Leaderboard").setColor("BLURPLE");

  if (client.user?.avatarURL()) {
    embed.setThumbnail(client.user.avatarURL() as string);
  }

  let description = "Top 10 Users With The Most experience \n";
  let position = 1;
  for (const user of await GoUser.find({ take: 10, order: { xp: "DESC" } })) {
    description += `\n  ${position}. ${mention(user.id)} |  ${user.xp}xp`;
    position++;
  }

  embed.setDescription(description);
  return embed;
}

async function getMessageLeaderboard() {
  const embed = new MessageEmbed().setTitle("Leaderboard").setColor("BLURPLE");

  if (client.user?.avatarURL()) {
    embed.setThumbnail(client.user.avatarURL() as string);
  }

  let description = "Top 10 Users With The Most Messages \n";
  let position = 1;
  for (const user of await GoUser.find({
    take: 10,
    order: { messages: "DESC" },
  })) {
    description += `\n  ${position}. ${mention(user.id)} |  ${
      user.messages
    } Messages`;
    position++;
  }

  embed.setDescription(description);
  return embed;
}

export default cmd;
