import { Command } from "../utils/types";
import { items, Item } from "../utils/item";
import { MessageEmbed } from "discord.js";
import { incrementBalance } from "../db/entity/GoUser";
import { randInt } from "../utils/randInt";

const pickOne = (arr: Item[]): Item | undefined => {
  const rand = Math.random();
  let sum = 0;
  for (const item of arr) {
    sum += item.dropRate;
    if (rand <= sum) {
      return item;
    }
  }
  return undefined;
};

const cmd: Command = {
  name: "mine",
  description: "Mine and get one of the items",
  execute: async (msg, _args) => {
    // TODO: Add a cooldown
    const item = pickOne(items);
    if (!item) {
      const money = randInt(300, 500);
      incrementBalance(msg.author, money);
      msg.channel.send(`You mined ${money} coin!`);
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(item.name)
      .setDescription(item.description)
      .setColor(0x00ff00)
      .setFooter(`${msg.author.username} mined a ${item.name}`);

    msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
