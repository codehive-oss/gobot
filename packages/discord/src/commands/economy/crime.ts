import { CooldownCommand } from "../../utils/CooldownCommand";
import { Message } from "discord.js";
import { GoUser } from "@gobot/database";
import { randInt } from "../../utils/random";

const cmd = new CooldownCommand({
  aliases: [],
  name: "crime",
  category: "economy",
  description: "commit a crime",
  cooldown: 30,

  execute: async function (msg: Message, _args: string[]) {
    const goUser = await GoUser.toGoUser(msg.author.id);

    if (cmd.canExecute(cmd.name, goUser.id)) {
      cmd.setCooldown(cmd.name, goUser.id, cmd.cooldown);
      const rnd = randInt(0, 100);

      if (rnd > 70) {
        //lose
        const lose = randInt(1000, 1200);
        const loss = goUser.decrementHandBalance(lose);
        goUser.save();
        await msg.reply(`You lost ${loss} GoCoins :thermometer_face:`);
      } else if (rnd < 70) {
        //win
        const win = randInt(400, 600);
        goUser.incrementHandBalance(win);
        const rand = randInt(20, 80);
        goUser.addXp(rand);

        goUser.save();
        await msg.reply(
          `You won ${win} GoCoins and you earned ${rand}xp :moneybag:`
        );
      } else {
        //jackpot
        goUser.incrementHandBalance(5000);

        goUser.save();
        await msg.reply(
          "You won the Jackpot of 5000 GoCoins! Congrats :money_with_wings: :money_with_wings: :money_with_wings:"
        );
      }
    } else {
      msg.reply(
        `You can't commit a crime for another ${cmd.getCooldown(
          cmd.name,
          goUser.id,
          cmd.cooldown
        )} seconds.`
      );
    }
  },
});

export default cmd;
