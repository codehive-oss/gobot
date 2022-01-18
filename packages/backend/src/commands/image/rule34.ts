import { Command } from "@utils/commandTypes/Command";
import { randomChoice } from "@utils/random";
import axios from "axios";
import { MessageEmbed, TextChannel } from "discord.js";

const limit = 50;
const rule34APIEndpoint = "https://r34-json.herokuapp.com/posts";

interface Rule34APIPost {
  id: number;
  file_url: string;
}

interface Rule34APIResponse {
  count: number;
  posts: Rule34APIPost[];
}

export default new Command({
  name: "rule34",
  description: "Sends a random rule 34 image",
  usage: "rule34",
  category: "image",
  aliases: ["r34"],
  async execute(msg, args, server) {
    if (!server.nsfw || !server.anime) {
      msg.reply("This server doesn't allow NSFW or anime images!");
      return;
    }
    if (!(msg.channel as TextChannel).nsfw) {
      msg.reply("This channel doesn't allow NSFW images!");
      return;
    }
    if (!args.length) {
      msg.reply("You need to provide text to create a image from!");
      return;
    }

    const code = encodeURIComponent(args.join(" "));
    const resp = await axios.get(
      `${rule34APIEndpoint}?tags=${code}&limit=${limit}`
    );
    const data: Rule34APIResponse = resp.data;

    if(data.posts.length <= 0) {
      msg.reply("No results found!");
      return;
    }

    const link = randomChoice(data.posts).file_url;

    const embed = new MessageEmbed()
      .setTitle("Rule34")
      .setURL(link)
      .setColor("#0099ff")
      .setImage(link);

    await msg.reply({ embeds: [embed] });
  },
});
