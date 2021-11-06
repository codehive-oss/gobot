import axios from "axios";
import { MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../types";

interface WaifuResponse {
  url: string;
}

const cmd: Command = {
  name: "waifu",
  description: "Sends a random waifu image",
  execute: async (msg, _args) => {
    const res = await axios.get(`https://api.waifu.pics/sfw/waifu`);
    const data: WaifuResponse = res.data;
    await msg.reply({
      embeds: [new MessageEmbed().setImage(data.url).setColor("#ff00ff")],
    });
  },
};

module.exports = cmd;
