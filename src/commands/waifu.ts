import axios from "axios";
import {MessageEmbed} from "discord.js";
import {CooldownCommand} from "../utils/types";

interface WaifuResponse {
    url: string;
}


const cmd: CooldownCommand = {
    name: "waifu",
    description: "Sends a random waifu image",
    cooldown: 200,
    execute: async (msg, _args) => {
        await msg.reply("Anime is a crime punishable by death")
        // const res = await axios.get(`https://api.waifu.pics/sfw/waifu`);
        // const data: WaifuResponse = res.data;
        // await msg.reply({
        //     embeds: [new MessageEmbed().setImage(data.url).setColor("#ff00ff")],
        // });
        //

    },
};

module.exports = cmd;
