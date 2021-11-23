import {Message} from "discord.js";
import {Command} from "../../utils/commandTypes";
import simplydjs, {tictactoeOptions} from "simply-djs"

const cmd: Command = {
    async execute(msg: Message, _args: string[]) {
        await simplydjs.tictactoe(msg, {
            credit: false,
            embedFoot: " "
        } as tictactoeOptions)
    },
    name: "tictactoe",
    aliases: ["ttt"],
    category: "misc",
    description: "sends the bots uptime",
};

module.exports = cmd;




