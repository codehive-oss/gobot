import {Command} from "../types";
import {Message} from "discord.js";
import {createUser, upsert} from "../db/GoUser";

const cmd : Command = {
    name: "balance",
    description: "Shows your current balance",
    async execute(msg: Message, args: string[]) {
        if(!args[0]) { //own balance
            await createUser(msg.author)
            const balance = (await upsert(msg.author))?.balance
            await msg.reply("Your balance: " + balance)
        } else { //someone elses balance


        }

    }
}

module.exports = cmd