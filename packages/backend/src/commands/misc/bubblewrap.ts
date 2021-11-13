import {Command} from "../../utils/commandTypes";
import {Message} from "discord.js";

const cmd: Command = {
    name: "bubblewrap",
    description: "Send Bubblewrap",
    usage: "bubblewrap",
    async execute(msg: Message, _args: string[]) {
        await msg.reply("||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n" +
                               "||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n" +
                               "||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n" +
                               "||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n" +
                               "||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n")

    },
};

module.exports = cmd;
