import {Message} from "discord.js";
import {client} from "../client";
import {Command} from "../types";

const cmd: Command = {
    aliases: [],
    async execute(msg: Message, args: string[]) {
        if (client.uptime) {
            let totalSeconds = client.uptime / 1000;
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            await msg.reply(
                `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`
            );
        }
    },
    name: "uptime",
    description: "sends the bots uptime"

};

module.exports = cmd
