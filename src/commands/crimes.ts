import { Command } from "../utils/types";
import { Message, User } from "discord.js";
import { decrementBalance, upsert } from "../db/entity/GoUser";
import { randInt } from "../utils/randInt";

const cooldown = new Map();
const COOLDOWN = 30;

const cmd: Command = {
  aliases: [],
  name: "crime",
  description: "commit a crime",

  async execute(msg: Message, _args: string[]) {
    const rnd = randInt(0, 100);
    const user = await upsert(msg.author);
    if (isOnCooldown(msg.author)) {
      await msg.reply(
        "You are still on cooldown for " + getCooldown(msg.author) + " seconds"
      );
      return;
    }

    if (rnd > 70) {
      //lose
      const lose = randInt(1000, 1200);
      await msg.reply(
        `You lost ${await decrementBalance(
          msg.author,
          lose
        )}$ :thermometer_face:`
      );
    } else if (rnd < 70) {
      //win
      const win = randInt(400, 600);
      user.balance = user.balance + win;
      await user.save();
      await msg.reply(`You won ${win}$ :moneybag:`);
    } else {
      //jackpot
      user.balance += 5000;
      await user.save();
      await msg.reply(
        "You won the Jackpot of 5000$! Congrats :money_with_wings: :money_with_wings: :money_with_wings: "
      );

      activateCooldown(msg.author);

      module.exports = cmd;
    }
  },
};

function isOnCooldown(user: User) {
  const lastUsed = cooldown.get(user.id) ? cooldown.get(user.id) : 0;
  const delay = new Date().getTime() - lastUsed!;
  return delay < COOLDOWN * 1000;
}

function getCooldown(user: User): number {
  const lastUsed = cooldown.get(user.id) ? cooldown.get(user.id) : 0;
  const delay = new Date().getTime() - lastUsed!;
  return COOLDOWN - Math.floor(delay / 1000);
}

function activateCooldown(user: User): void {
  cooldown.set(user.id, new Date().getTime());
}
