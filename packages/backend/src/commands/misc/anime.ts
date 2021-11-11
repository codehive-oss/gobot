import {Command} from "../../utils/types";
import {Message} from "discord.js";

const cmd : Command = {
    name: "anime",
    description: "anime",
    async execute(msg: Message, _args: string[]) {
        await msg.reply("anime is a crime punishable by death")
    }
}

module.exports = cmd