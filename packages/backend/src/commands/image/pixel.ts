import {Command} from "../../utils/types";
import {Message} from "discord.js";
import {alexapi} from "../../utils/alexapi";


const cmd: Command = {
    name: "pixel",
    description: "Pixelifies the given User",
    usage: "pixel <@user>",
    category: "image",
    async execute(msg: Message, _args: string[]) {
        let target
        if(msg.mentions.users.first()) {
            target = msg.mentions.users.first()
        } else {
            target = msg.author
        }

        if(!target!.avatarURL()) {
            await msg.reply("That User does not have a Profile Picture")
            return
        }

        const link = await alexapi.image.pixelate({image: target!.avatarURL()!})
        await msg.reply({files: [{attachment: link}]})
    }
}

module.exports = cmd