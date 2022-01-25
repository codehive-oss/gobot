// TODO: Better implementation with upgrades and buttons
import { Command } from "@utils/commandTypes/Command";
import { Message, MessageEmbed } from "discord.js";
import { allTools, calculateUpgradeCost } from "@utils/tools";
import { GoServer } from "@db/entities/GoServer";
import { GoUser } from "@db/entities/GoUser";

const cmd = new Command({
  name: "shop",
  category: "economy",
  description: "buy items",
  aliases: ["store"],
  usage: "shop",
  async execute(msg: Message, _args: string[], server: GoServer) {
    const goUser = await GoUser.toGoUser(msg.author.id);
    const embed = new MessageEmbed()
      .setColor("#329ea8")
      .setTitle(":shopping_cart: Shop")
      .setDescription(`Use ${server.prefix}buy [Item] to buy an Item`);

    allTools.forEach((tool, index) => {
      embed.addField(
        `${tool.name} level ${goUser.getToolLevel(index) + 1}`,
        `${tool.description} | Price: ${calculateUpgradeCost(
          tool.price,
          goUser.getToolLevel(index)
        )} GoCoins`
      );
    });

    await msg.reply({ embeds: [embed] });
  },
});

export default cmd;
