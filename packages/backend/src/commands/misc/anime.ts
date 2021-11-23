import axios from "axios";
import { MessageEmbed } from "discord.js";
import { Command } from "../../utils/commandTypes";

interface AnimeResponse {
  url: string;
}

const AnimeCategories = [
  "waifu",
  "neko",
  "shinobu",
  "megumin",
  "bully",
  "cuddle",
  "cry",
  "hug",
  "awoo",
  "kiss",
  "lick",
  "pat",
  "smug",
  "bonk",
  "yeet",
  "blush",
  "smile",
  "wave",
  "highfive",
  "handhold",
  "nom",
  "bite",
  "glomp",
  "slap",
  "kill",
  "kick",
  "happy",
  "wink",
  "poke",
  "dance",
  "cringe",
];

// TODO: Add check for anime category
const cmd: Command = {
  name: "anime",
  description: "Sends a random anime picture",
  execute: async (msg, args) => {
    let category = "waifu";
    if (args[0]) {
      if (AnimeCategories.includes(args[0].toLowerCase())) {
        category = args[0].toLowerCase();
      }
    }
    const res = await axios.get(`https://api.waifu.pics/sfw/${category}`);
    const data: AnimeResponse = res.data;
    await msg.reply({
      embeds: [new MessageEmbed().setImage(data.url).setColor("#ff00ff")],
    });
  },
};

module.exports = cmd;