import axios from "axios";
import { MessageEmbed } from "discord.js";
import { Command } from "../../utils/commandTypes";

// Jikan api payload type
interface JikanPayload {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  start_date: string;
  end_date: string;
  members: number;
  rated: AnimeRating;
}

type AnimeRating = "G" | "PG" | "PG-13" | "R" | "R+" | "Rx";

const cmd: Command = {
  name: "animeinfo",
  category: "misc",
  description: "Get information about an anime",
  execute: async (msg, args, server) => {
    if (!server.anime) {
      msg.reply("You cannot use anime commands on this server!");
      return;
    }

    // serach for anime with jikan api
    const { data } = await axios.get(
      `https://api.jikan.moe/v3/search/anime?q=${args.join(" ")}`
    );

    const animesFound: JikanPayload[] = data.results;

    // get the best matching result based of name
    const anime = animesFound.find(
      (result: JikanPayload) =>
        result.title.toLowerCase() === args.join(" ").toLowerCase()
    );

    // if no anime found, return
    if (!anime) {
      msg.reply("No results found!");
      return;
    }

    // Check if anime is rated appropriate
    if (anime.rated == "Rx" && !server.nsfw) {
      msg.reply(
        "This anime is rated for mature audiences and cannot be viewed on this server!"
      );
      return;
    }

    // Use Jikan api to get anime info
    const embed = new MessageEmbed()
      .setTitle(anime.title)
      .setURL(anime.url)
      .setDescription(anime.synopsis)
      .setColor("RANDOM")
      .setThumbnail(anime.image_url)
      .addField("Type", anime.type, true)
      .addField("Episodes", anime.episodes.toString(), true)
      .addField("Score", anime.score.toString(), true)
      .addField("Rating", anime.rated, true)
      .setFooter(
        `Requested by ${msg.author.username}`,
        msg.author.avatarURL() ?? undefined
      );
    msg.reply({ embeds: [embed] });
  },
};

module.exports = cmd;
