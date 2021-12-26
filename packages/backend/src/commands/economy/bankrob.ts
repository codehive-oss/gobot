import { GoUser } from "@db/entities/GoUser";
import { CooldownCommand } from "@utils/commandTypes";
import { checkRobTarget } from "@utils/checkRobTarget";
import { randInt } from "@utils/random";

const robRate = 0.05;
const failRate = 0.75;

const cmd = new CooldownCommand({
  name: "bankrob",
  description: "Bankrob someone",
  category: "economy",
  usage: "bankrob <@user>",
  cooldown: 120,
  execute: async function (msg, _args) {
    const dcUser = msg.author;
    if (cmd.canExecute(cmd.name, dcUser.id)) {
      let dcTarget = msg.mentions.users.first();

      const err = checkRobTarget(dcTarget, dcUser);

      if (err) {
        await msg.reply(err);
        return;
      }
      dcTarget = dcTarget!;
      const user = await GoUser.toGoUser(dcUser.id);
      const target = await GoUser.toGoUser(dcTarget.id);

      const chance = Math.random();

      const robAmount = Math.floor(target.handBalance * robRate);

      cmd.setCooldown(cmd.name, dcUser.id, cmd.cooldown);

      // Failure
      if (chance < failRate) {
        const loss = user.payUser(target, robAmount);

        user.save();
        target.save();

        await msg.reply(
          `You got caught by ${dcTarget.username}! You had to pay them ${loss} GoCoins`
        );
        return;
      }

      // Success
      const gain = target.decrementBankBalance(robAmount);
      user.incrementBankBalance(gain);
      const rand = randInt(40, 80);
      user.addXp(rand);

      target.save();
      user.save();
      await msg.reply(
        `You robbed ${dcTarget.username}! You stole ${gain} GoCoins and you earned ${rand}xp`
      );
    } else {
      // Cooldown
      await msg.reply(
        `You can't rob someone for another ${cmd.getCooldown(
          cmd.name,
          dcUser.id,
          cmd.cooldown
        )} seconds`
      );
    }
  },
});

export default cmd;
