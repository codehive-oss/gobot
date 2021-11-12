import { Command } from "../../utils/commandTypes";
import {Message} from "discord.js";
import {alexapi} from "../../utils/alexapi";



const cmd: Command = {
    name: "cat",
    description: "Sends a Picture of a Cat",
    usage: "cat",
    category: "image",
    async execute(msg: Message, _args: string[]) {
        const link: any = await alexapi.image.cats()
        await msg.reply({
            files: [{attachment: link.file}]
        })
    }
}

module.exports = cmd