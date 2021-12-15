import axios from "axios";
import { MessageEmbed, TextChannel } from "discord.js";
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

const nsfwAnimeCategories = ["waifu", "neko", "trap", "blowjob"];

const cmd = new Command({
  name: "anime",
  description: "Sends a random anime picture",
  tags: ["anime"],
  category: "misc",
  execute: async (msg, args, server) => {
    if (!server.anime) {
      msg.reply("You cannot use anime commands on this server!");
      return;
    }
    let category = "waifu";
    let imageType: "sfw" | "nsfw" = "sfw";
    if (args[1]) {
      if (args[1].toLowerCase() === "nsfw") {
        if (!(msg.channel as TextChannel).nsfw) {
          msg.reply("This channel is not nsfw!");
          return;
        }
        if (!server.nsfw) {
          msg.reply("You cannot use nsfw commands on this server!");
          return;
        }
        imageType = "nsfw";
      }
    }

    if (args[0]) {
      if (imageType == "sfw") {
        if (AnimeCategories.includes(args[0].toLowerCase())) {
          category = args[0].toLowerCase();
        }
      } else if (imageType == "nsfw") {
        if (nsfwAnimeCategories.includes(args[0].toLowerCase())) {
          category = args[0].toLowerCase();
        }
      }
    }

    const res = await axios.get(
      `https://api.waifu.pics/${imageType}/${category}`
    );
    const data: AnimeResponse = res.data;
    await msg.reply({
      embeds: [new MessageEmbed().setImage(data.url).setColor("#ff00ff")],
    });
  },
});

module.exports = cmd;
