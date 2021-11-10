import { Command } from "../../utils/types";
import { Message, MessageEmbed } from "discord.js";
import { GoUser } from "../../db/entities/GoUser";
import { client } from "../../utils/client";
import { mention } from "../../utils/mention";

const cmd: Command = {
  name: "leaderboard",
  category: "level",
  usage: "leaderboard",
  description: "Shows the Users with the Most Experience",
  async execute(msg: Message, _args: string[]) {
    const embed = new MessageEmbed()
      .setTitle("Leaderboard")
      .setColor("BLURPLE");

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
    await msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
