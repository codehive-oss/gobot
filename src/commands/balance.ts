import { Command } from "../utils/types";
import { Message, MessageEmbed } from "discord.js";
import { createUser, upsert } from "../db/entity/GoUser";

const cmd: Command = {
  aliases: ["bal"],
  name: "balance",
  description: "Shows your current balance",
  async execute(msg: Message, args: string[]) {
    if (!args[0]) {
      //own balance

      const goUser = await upsert(msg.author);
      const embed = new MessageEmbed();
      embed.setColor("#ffd700");
      embed.setTitle(`:moneybag: Balance of ${msg.author.username}`);
      if (msg.author?.avatarURL()) {
        embed.setThumbnail(msg.author.avatarURL()!);
      }
      embed.addField("Hand Balance", goUser.handBalance + "$");
      embed.addField("Bank Balance", goUser.bankBalance + "$");

      msg.reply({ embeds: [embed] });
    } else {
      // someone elses balance
    }
  },
};

module.exports = cmd;
