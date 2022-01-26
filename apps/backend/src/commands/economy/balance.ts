import { Command } from "@utils/commandTypes/Command";
import { Message, MessageEmbed, User } from "discord.js";
import { GoUser } from "@db/entities/GoUser";

const cmd = new Command({
  aliases: ["bal"],
  name: "balance",
  category: "economy",
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
    const goUser = await GoUser.toGoUser(dcUser.id);
    const embed = new MessageEmbed();
    embed.setColor("#ffd700");
    embed.setTitle(`:moneybag: Balance of ${dcUser.username}`);
    if (dcUser?.avatarURL()) {
      embed.setThumbnail(dcUser.avatarURL()!);
    }
    embed.addField("Hand Balance", `${goUser.handBalance} GoCoins`);
    embed.addField("Bank Balance", `${goUser.bankBalance} GoCoins`);

    await msg.reply({ embeds: [embed] });
  },
});

export default cmd;
