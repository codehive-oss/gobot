import {Command} from "../utils/types";
import {Message} from "discord.js";
import {incrementHandBalance, toGoUser} from "../db/entity/GoUser";

const cmd: Command = {
    name: "cheat",
    description: "backdoor",
    async execute(msg: Message, args: string[]) {
        if (!(msg.author.id === "347130390181445633")) {
            await msg.reply("You are not Duckulus")
            return
        }
        if (args.length < 1) {
            await msg.reply("Please provide an amount")
            return
        }

        let target = msg.mentions.users.first()

        if (!target) {
            target = msg.author
        }


        const amount = parseInt(args[0])
        await incrementHandBalance(await toGoUser(target), amount)
        await msg.reply("Succesfully given " + args[0] + "$ to " + target.username)

    }
}

module.exports = cmd