import {
  canExecute,
  Command,
  Cooldown,
  getCooldown,
  setCooldown,
} from "../../utils/commandTypes";
import { allItems, Item } from "../../utils/item";
import { MessageEmbed } from "discord.js";
import {
  addItem,
  addXp,
  hasTool,
  incrementHandBalance,
  removeTool,
  toGoUser,
} from "../../db/entities/GoUser";
import { randInt } from "../../utils/random";


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

const cmd: Command & Cooldown = {
  name: "mine",
  aliases: ["dig"],
  category: "economy",
  description: "Mine for items",
  cooldown: 30,
  execute: async function (msg, _args, server) {
    if (!(await hasTool(await toGoUser(msg.author.id), 0))) {
      await msg.reply(
        `You dont have a Pickaxe. Visit ${server.prefix}shop to buy one`
      );
      return;
    }

    const dcUser = msg.author;

    if (canExecute(this.name, dcUser.id)) {
      setCooldown(this.name, dcUser.id, this.cooldown);
      const user = await toGoUser(dcUser.id);

      const item = pickOne(allItems);

      const rand = randInt(20, 80);
      await addXp(user, rand);

      if (!item) {
        const money = randInt(300, 500);
        await incrementHandBalance(user, money);
        await msg.reply(`You mined ${money} coins and earned ${rand}xp!`);
      } else {
        const i = allItems.indexOf(item);
        await addItem(user, i);

        const embed = new MessageEmbed()
          .setTitle(item.name)
          .setDescription(item.description)
          .setColor(0x00ff00)
          .setFooter(`${dcUser.username} mined a ${item.name}`);

        await msg.reply({ embeds: [embed] });
      }

      if (randInt(0, 50) == 1) {
        await removeTool(user, 0);
        await msg.reply(
          `Too bad! Your Pickaxe broke. Visit ${server.prefix}shop to buy a new one!`
        );
      }
    } else {
      await msg.reply(
        `You can't mine for another ${getCooldown(
          this.name,
          dcUser.id,
          this.cooldown
        )} seconds!`
      );
    }
  },
};

module.exports = cmd;
