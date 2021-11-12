import { Command } from "../../utils/commandTypes";
import {
  Message,
  // MessageActionRow, MessageButton,
  MessageEmbed,
} from "discord.js";
import { PREFIX } from "../../utils/constants";
import { tools } from "../../utils/tools";

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

    // const row = new MessageActionRow().addComponents(
    //   new MessageButton()
    //     .setCustomId("primary")
    //     .setLabel("Test")
    //     .setStyle("PRIMARY")
    // );

    for (const tool of tools) {
      embed.addField(tool.name, tool.description + " | " + tool.price + "$");
    }

    await msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
