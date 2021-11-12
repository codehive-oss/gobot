import { canExecute, CooldownCommand, getCooldown, setCooldown } from "../../utils/commandTypes";
import {Message} from "discord.js";
import {addXp, decrementHandBalance, incrementHandBalance, toGoUser} from "../../db/entities/GoUser";
import {randInt} from "../../utils/randInt";

const cmd: CooldownCommand = {
    aliases: [],
    name: "crime",
    category: "economy",
    description: "commit a crime",
    cooldown: 30,

    execute: async function (msg: Message, _args: string[]) {
        const user = await toGoUser(msg.author);

        if (canExecute(this.name, user.id)) {
            setCooldown(this.name, user.id, this.cooldown);
            const rnd = randInt(0, 100);


            if (rnd > 70) {
                //lose
                const lose = randInt(1000, 1200);
                await msg.reply(
                    `You lost ${await decrementHandBalance(
                        user,
                        lose
                    )}$ :thermometer_face:`
                );
            } else if (rnd < 70) {
                //win
                const win = randInt(400, 600);
                await incrementHandBalance(user, win);
                const rand = randInt(20, 80)
                await addXp(user, rand)
                await msg.reply(`You won ${win}$ and you earned ${rand}xp :moneybag:`);
            } else {
                //jackpot
                await incrementHandBalance(user, 5000);
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
