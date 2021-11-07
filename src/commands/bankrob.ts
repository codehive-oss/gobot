import {
  incrementBankBalance,
  decrementBankBalance,
  payUser,
  toGoUser,
} from "../db/entity/GoUser";
import {
  canExecute,
  getCooldown,
  CooldownCommand,
  setCooldown,
} from "../utils/types";
import { checkRobTarget } from "../utils/checkRobTarget";

const robRate = 0.2;
const failRate = 0.75;

const cmd: CooldownCommand = {
  name: "bankrob",
  description: "Bankrob someone",
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

      const robAmount = Math.floor(target.bankBalance * robRate);

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
      await msg.reply(
        `You robbed ${dcTarget.username}! They had to pay you ${gain}$`
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
