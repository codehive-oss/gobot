import {Command} from "../../utils/types";
import {Message} from "discord.js";
import {alexapi} from "../../utils/alexapi";


const cmd: Command = {
    name: "pornhub",
    description: "Creates the Pornhub Logo",
    usage: "pornhub [text1] [text2]",
    category: "image",
    async execute(msg: Message, args: string[]) {
        if(args.length<2) {
            await msg.reply("Please Provide 2 arguments")
            return
        }

        const link = await alexapi.image.pornhub({text: args[0], text2: args[1]})
        await msg.reply({files: [{attachment: link}]})
    }
}

module.exports = cmd