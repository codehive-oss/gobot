import { Command } from "../utils/types";
import { Message, MessageEmbed } from "discord.js";
import { PREFIX } from "../utils/constants";
import { tools } from "../utils/tools";

const cmd: Command = {
  name: "shop",
  category: "economy",
  description: "buy items",
  aliases: ["store"],
  usage: "shop",
  async execute(msg: Message, _args: string[]) {
    const embed = new MessageEmbed()
      .setColor("#329ea8")
      .setTitle(":shopping_cart: Shop")
      .setDescription(`Use ${PREFIX}buy [Item] to buy an Item`);

    for (const tool of tools) {
      embed.addField(tool.name, tool.description + " | " + tool.price + "$");
    }
    await msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
