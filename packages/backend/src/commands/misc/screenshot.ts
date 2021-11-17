import axios from "axios";
import {MessageEmbed} from "discord.js";
import { Command } from "../../utils/commandTypes";

const cmd: Command = {
    name: "screenshot",
    description: "screenshots the given webpage",
    category: "misc",
    execute: async (msg, args) => {
        if (!args[0]) {
            await msg.reply("Please provide a website!");
            return;
        }
        const url: string = args[0];
        try {
            await msg.reply({
                embeds: [
                    new MessageEmbed().setImage(
                        (
                            await axios.get(`https://api.screensoap.com/screenshot?url=${url}`)
                        ).data.file.url
                    ),
                ],
            });
        } catch (e) {
            await msg.reply("Invalid URL")
        }

    },
};

module.exports = cmd;
