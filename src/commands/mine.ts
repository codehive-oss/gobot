import { canExecute, CooldownCommand, getCooldown, setCooldown } from "../utils/types";
import { allItems, Item } from "../utils/item";
import { MessageEmbed } from "discord.js";
import { addItem, incrementHandBalance } from "../db/entity/GoUser";
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

const cmd: CooldownCommand = {
  name: "mine",
  description: "Mine for items",
  cooldown: 30,
  execute: async function (msg, _args) {
    const user = msg.author;
    if (canExecute(this.name, user.id)) {
      setCooldown(this.name, user.id, this.cooldown);

      const item = pickOne(allItems);
      if (!item) {
        const money = randInt(300, 500);
        incrementHandBalance(user, money);
        msg.channel.send(`You mined ${money} coin!`);
        return;
      }

      const i = allItems.indexOf(item);
      addItem(msg.author, i);

      const embed = new MessageEmbed()
        .setTitle(item.name)
        .setDescription(item.description)
        .setColor(0x00ff00)
        .setFooter(`${user.username} mined a ${item.name}`);

      msg.reply({ embeds: [embed] });

    } else {
      msg.reply(`You can't mine for another ${getCooldown(this.name, user.id, this.cooldown)} seconds!`);
    }
  },
};

module.exports = cmd;
