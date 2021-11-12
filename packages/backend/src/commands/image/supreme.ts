import { Command } from "../../utils/commandTypes";
import {Message} from "discord.js";
import {alexapi} from "../../utils/alexapi";


const cmd: Command = {
    name: "supreme",
    description: "Creates the Supreme Logo",
    usage: "supreme [text]",
    category: "image",
    async execute(msg: Message, args: string[]) {
        if(args.length<1) {
            await msg.reply("Please Provide an argument")
            return
        }

        const link = await alexapi.image.supreme({text: args.join(" ")})
        await msg.reply({files: [{attachment: link}]})
    }
}

module.exports = cmd