import {Command, cooldownCommand} from "../types";
import {Message, User} from "discord.js";
import {decrementBalance, upsert} from "../db/entity/GoUser";
import {randint} from "../utils";

const cmd : Command
    = {
    aliases: [],
    name: "crime",
    description: "commit a crime",
    async execute(msg: Message, args: string[]) {
        const rnd = randint(0, 100)
        const user = await upsert(msg.author)

        if (isOnCooldown(msg.author)) {
            await msg.reply("You are still on cooldown for " + getCooldown(msg.author) + " seconds")
            return
        }

        if (rnd > 70) {            //lose
            const lose = randint(1000, 1200)
            await msg.reply(`You lost ${await decrementBalance(msg.author, lose)}$ :thermometer_face:`)
        } else if (rnd < 70) {     //win
            const win = randint(400, 600)
            user.balance = user.balance + win
            await user.save()
            await msg.reply(`You won ${win}$ :moneybag:`)
        } else {                 //jackpot
            user.balance += 5000
            await user.save()
            await msg.reply("You won the Jackpot of 5000$! Congrats :money_with_wings: :money_with_wings: :money_with_wings: ")
        }

        activateCooldown(msg.author)
    }
}

const cooldownMap =  new Map()
const cooldown = 30

function isOnCooldown(user: User) {
    const lastUsed = cooldownMap.get(user.id) ? cooldownMap.get(user.id) : 0
    const delay = new Date().getTime() - lastUsed!
    return delay < cooldown * 1000;
}

function getCooldown(user: User) : number {
    const lastUsed = cooldownMap.get(user.id) ? cooldownMap.get(user.id) : 0
    const delay = new Date().getTime() - lastUsed!
    return cooldown - Math.floor(delay/1000)
}

function activateCooldown(user: User) : void {
    cooldownMap.set(user.id, new Date().getTime())
}

module.exports = cmd