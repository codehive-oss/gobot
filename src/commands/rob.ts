import {
  incrementHandBalance,
  decrementHandBalance,
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

const robRate = 0.4;
const failRate = 0.5;

const cmd: CooldownCommand = {
  name: "rob",
  description: "Rob a user (chance of getting caught)",
  cooldown: 30,
  execute: async function (msg, _args) {
    const dcUser = msg.author;
    if (canExecute(this.name, dcUser.id)) {
      setCooldown(this.name, dcUser.id, this.cooldown);
      let dcTarget = msg.mentions.users.first();

      const err = checkRobTarget(dcTarget, dcUser);

      if (err) {
        msg.reply(err);
        return;
      }
      dcTarget = dcTarget!;

      const user = await toGoUser(dcUser);
      const target = await toGoUser(dcTarget);
      const robAmount = Math.floor(target.handBalance * robRate);

      const chance = Math.random();

      // Failure
      if (chance < failRate) {
        const loss = await payUser(user, target, robAmount);
        msg.reply(
          `You got caught by ${dcTarget.username}! You had to pay them ${loss}$`
        );
        return;
      }

      // Success
      const gain = await decrementHandBalance(target, robAmount);
      await incrementHandBalance(user, gain);
      msg.reply(
        `You robbed ${dcTarget.username}! They had to pay you ${gain}$`
      );
    } else {
      // Cooldown
      msg.reply(
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
