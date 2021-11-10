import {Message} from "discord.js";
import {Command} from "../utils/types";
import {client} from "../utils/client";

const cmd: Command = {
    name: "ping",
    description: "sends the bots latency",
    execute(message: Message, _args: string[]) {
        message.reply(`\`${client.ws.ping}\`ms`);
    },
};

module.exports = cmd;
