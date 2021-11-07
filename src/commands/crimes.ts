import {
  canExecute,
  Command,
  CooldownCommand,
  getCooldown,
  setCooldown,
} from "../utils/types";
import { Message, User } from "discord.js";
import { decrementHandBalance, upsert } from "../db/entity/GoUser";
import { randInt } from "../utils/randInt";

const cmd: CooldownCommand = {
  aliases: [],
  name: "crime",
  description: "commit a crime",
  cooldown: 30,

  execute: async function (msg: Message, _args: string[]) {
    const user = await upsert(msg.author);

    if (canExecute(this.name, user.id)) {
      setCooldown(this.name, user.id, this.cooldown);
      const rnd = randInt(0, 100);

      if (rnd > 70) {
        //lose
        const lose = randInt(1000, 1200);
        await msg.reply(
          `You lost ${await decrementHandBalance(
            msg.author,
            lose
          )}$ :thermometer_face:`
        );
      } else if (rnd < 70) {
        //win
        const win = randInt(400, 600);
        user.handBalance = user.handBalance + win;
        await user.save();
        await msg.reply(`You won ${win}$ :moneybag:`);
      } else {
        //jackpot
        user.handBalance += 5000;
        await user.save();
        await msg.reply(
          "You won the Jackpot of 5000$! Congrats :money_with_wings: :money_with_wings: :money_with_wings: "
        );
      }
    } else {
      msg.reply(
        `You can't commit a crime for another ${getCooldown(
          this.name,
          user.id,
          this.cooldown
        )} seconds.`
      );
    }
  },
};

module.exports = cmd;
