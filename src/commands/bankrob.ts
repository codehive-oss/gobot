import {
  incrementBankBalance,
  decrementBankBalance,
  payUser,
} from "../db/entity/GoUser";
import { canExecute, getCooldown, CooldownCommand, setCooldown } from "../utils/types";
import { checkRobTarget } from "../utils/checkRobTarget";

const robAmount = 2000;
const failRate = 0.75;

const cmd: CooldownCommand = {
  name: "bankrob",
  description: "Bankrob someone",
  cooldown: 120,
  execute: async function (msg, _args) {
    const user = msg.author;
    if (canExecute(this.name, user.id)) {
      setCooldown(this.name, user.id, this.cooldown);
      let target = msg.mentions.users.first();

      const err = checkRobTarget(target, user);

      if (err) {
        msg.reply(err);
        return;
      }
      target = target!;

      const chance = Math.random();

      // Failure
      if (chance < failRate) {
        const loss = await payUser(user, target, robAmount);
        msg.reply(
          `You got caught by ${target.username}! You had to pay them ${loss}$`
        );
        return;
      }

      // Success
      const gain = await decrementBankBalance(target, robAmount);
      await incrementBankBalance(user, gain);
      msg.reply(`You robbed ${target.username}! They had to pay you ${gain}$`);
    } else {
      // Cooldown
      msg.reply(
        `You can't rob someone for another ${getCooldown(
          this.name,
          user.id,
          this.cooldown
        )} seconds`
      );
    }
  },
};

module.exports = cmd;