import { GoUser } from "@db/entities/GoUser";
import { CooldownCommand } from "@utils/commandTypes";
import { checkRobTarget } from "@utils/checkRobTarget";
import { randInt } from "@utils/random";

const robRate = 0.1;
const failRate = 0.5;

const cmd = new CooldownCommand({
  name: "rob",
  category: "economy",
  description: "Rob a user (chance of getting caught)",
  usage: "rob <@user>",
  cooldown: 30,
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
      const robAmount = Math.floor(target.handBalance * robRate);

      const chance = Math.random();

      cmd.setCooldown(cmd.name, dcUser.id, cmd.cooldown);

      // Failure
      if (chance < failRate) {
        const loss = user.payUser(target, robAmount);
        await msg.reply(
          `You got caught by ${dcTarget.username}! You had to pay them ${loss} GoCoins`
        );

        user.save();
        target.save();

        return;
      }

      // Success
      const gain = target.decrementHandBalance(robAmount);
      user.incrementHandBalance(gain);

      const rand = randInt(40, 80);
      user.addXp(rand);

      user.save();
      target.save();

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
