import {Command} from "../types";
import {Message} from "discord.js";
import {createUser, decrementBalance, getUser, upsert} from "../db/entity/GoUser";
import {randint} from "../utils";

const cmd : Command = {
    aliases: [],
    name: "crime",
    description: "commit a crime",
    async execute(msg: Message, args: string[]) {
        const rnd = randint(0, 100)
        const user = await upsert(msg.author)

        if(rnd>70) {            //lose
            const lose = randint(1000, 1200)
            await msg.reply(`You lost ${await decrementBalance(msg.author, lose)}$ :thermometer_face:`)
        } else if(rnd<70) {     //win
            const win = randint(400, 600)
            user.balance = user.balance + win
            await user.save()
            await msg.reply(`You won ${win}$ :moneybag:`)
        }else {                 //jackpot
            user.balance += 5000
            await user.save()
            await msg.reply("You won the Jackpot of 5000$! Congrats :money_with_wings: :money_with_wings: :money_with_wings: ")
        }
    }
}

module.exports = cmd