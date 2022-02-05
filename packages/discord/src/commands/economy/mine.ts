import { CooldownCommand } from "../../utils/CooldownCommand";
import { allItems, Item } from "@gobot/database";
import { MessageEmbed } from "discord.js";
import { GoUser, pickaxe } from "@gobot/database";
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

const cmd = new CooldownCommand({
  name: "mine",
  aliases: ["dig"],
  category: "economy",
  description: "Mine for items",
  cooldown: 30,
  execute: async function (msg, _args, server) {
    const dcUser = msg.author;

    if (cmd.canExecute(cmd.name, dcUser.id)) {
      cmd.setCooldown(cmd.name, dcUser.id, cmd.cooldown);
      const user = await GoUser.toGoUser(dcUser.id);

      if (!user.hasTool(pickaxe.id)) {
        msg.reply(
          `You need a pickaxe to mine! Use \`${server.prefix}shop\` to go to shop`
        );
        return;
      }

      const item = pickOne(allItems);

      const rand = randInt(20, 80);
      user.addXp(rand);

      if (!item) {
        const money = randInt(300, 500);
        user.incrementHandBalance(money);
        user.save();

        await msg.reply(`You mined ${money} GoCoins and earned ${rand}xp!`);
      } else {
        const i = allItems.indexOf(item);
        user.addItem(i);
        user.save();

        const embed = new MessageEmbed()
          .setTitle(item.name)
          .setDescription(item.description)
          .setColor("GREEN")
          .setFooter(`${dcUser.username} mined a ${item.name}`);

        await msg.reply({ embeds: [embed] });
      }
    } else {
      await msg.reply(
        `You can't mine for another ${cmd.getCooldown(
          cmd.name,
          dcUser.id,
          cmd.cooldown
        )} seconds!`
      );
    }
  },
});

export default cmd;
