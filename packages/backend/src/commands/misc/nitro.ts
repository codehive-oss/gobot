import {Command} from "../../utils/commandTypes";
import {Message} from "discord.js";
import {randString} from "../../utils/random";

const cmd: Command = {
    name: "nitro",
    description: "Sends a random nitro gift code",
    usage: "nitro",
    category: "misc",
    async execute(msg: Message, _args: string[]) {
        await msg.reply(`https://discord.gift/${randString(16)}`)

    },
};

module.exports = cmd;
