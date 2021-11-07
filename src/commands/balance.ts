import { Command } from "../utils/types";
import { Message, MessageEmbed, User } from "discord.js";
import { toGoUser } from "../db/entity/GoUser";

const cmd: Command = {
  aliases: ["bal"],
  name: "balance",
  description: "Shows your current balance",
  async execute(msg: Message, args: string[]) {
    let dcUser: User;
    if (!args[0]) {
      // own balance
      dcUser = msg.author;
    } else {
      // target balance
      const target = msg.mentions.users.first();
      if (!target) {
        await msg.reply("Please mention a valid user.");
        return;
      }
      dcUser = target;
    }
    const goUser = await toGoUser(dcUser);
    const embed = new MessageEmbed();
    embed.setColor("#ffd700");
    embed.setTitle(`:moneybag: Balance of ${dcUser.username}`);
    if (dcUser?.avatarURL()) {
      embed.setThumbnail(dcUser.avatarURL()!);
    }
    embed.addField("Hand Balance", goUser.handBalance + "$");
    embed.addField("Bank Balance", goUser.bankBalance + "$");

    await msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
