import { MessageEmbed } from "discord.js";
import { upsert } from "../db/entity/GoUser";
import { allItems } from "../utils/item";
import { Command } from "../utils/types";

const cmd: Command = {
  name: "inventory",
  description: "View your inventory.",
  aliases: ["inv"],
  async execute(msg, _args) {
    const user = await upsert(msg.author);

    const embed = new MessageEmbed();
    embed.setColor("#528B8B");
    embed.setTitle(`:school_satchel: Inventory of ${msg.author.username}`);
    if (msg.author?.avatarURL()) {
      embed.setThumbnail(msg.author.avatarURL()!);
    }
    for (let i = 0; i < user.items.length; i++) {
      const item = allItems[i];
      embed.addField(item.name, user.items[i].toString());
    }
    await msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
