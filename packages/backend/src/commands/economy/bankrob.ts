import {
  addXp,
  decrementBankBalance,
  incrementBankBalance,
  payUser,
  toGoUser,
} from "../../db/entities/GoUser";
import {
  canExecute,
  CooldownCommand,
  getCooldown,
  setCooldown
} from "../../utils/commandTypes";
import { checkRobTarget } from "../../utils/checkRobTarget";
import { randInt } from "../../utils/randInt";

const robRate = 0.05;
const failRate = 0.75;

const cmd: CooldownCommand = {
  name: "bankrob",
  description: "Bankrob someone",
  category: "economy",
  usage: "bankrob <@user>",
  cooldown: 120,
  execute: async function (msg, _args) {
    const dcUser = msg.author;
    if (canExecute(this.name, dcUser.id)) {
      let dcTarget = msg.mentions.users.first();

      const err = checkRobTarget(dcTarget, dcUser);

      if (err) {
        await msg.reply(err);
        return;
      }
      dcTarget = dcTarget!;
      const user = await toGoUser(dcUser);
      const target = await toGoUser(dcTarget);

      const chance = Math.random();

      const robAmount = Math.floor(target.handBalance * robRate);

      setCooldown(this.name, dcUser.id, this.cooldown);

      // Failure
      if (chance < failRate) {
        const loss = await payUser(user, target, robAmount);
        await msg.reply(
          `You got caught by ${dcTarget.username}! You had to pay them ${loss}$`
        );
        return;
      }

      // Success
      const gain = await decrementBankBalance(target, robAmount);
      await incrementBankBalance(user, gain);
      const rand = randInt(40, 80);
      await addXp(user, rand);
      await msg.reply(
        `You robbed ${dcTarget.username}! They had to pay you ${gain}$ and you earned ${rand}xp`
      );
    } else {
      // Cooldown
      await msg.reply(
        `You can't rob someone for another ${getCooldown(
          this.name,
          dcUser.id,
          this.cooldown
        )} seconds`
      );
    }
  },
};

module.exports = cmd;
