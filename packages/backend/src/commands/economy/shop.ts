import { Command } from "../../utils/commandTypes";
import { Message, MessageEmbed } from "discord.js";
import { tools } from "../../utils/tools";
import { GoServer } from "../../db/entities/GoServer";

const cmd = new Command({
  name: "shop",
  category: "economy",
  description: "buy items",
  aliases: ["store"],
  usage: "shop",
  async execute(msg: Message, _args: string[], server: GoServer) {
    const embed = new MessageEmbed()
      .setColor("#329ea8")
      .setTitle(":shopping_cart: Shop")
      .setDescription(`Use ${server.prefix}buy [Item] to buy an Item`);

    for (const tool of tools) {
      embed.addField(tool.name, tool.description + " | " + tool.price + "$");
    }

    await msg.reply({ embeds: [embed] });
  },
});

module.exports = cmd;
