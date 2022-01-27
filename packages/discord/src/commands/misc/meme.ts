import { Command } from "../../utils/Command";
import { MessageEmbed } from "discord.js";
import axios from "axios";

interface Meme {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: [string];
}

const cmd = new Command({
  name: "meme",
  description: "Sends a meme",
  usage: "meme",
  aliases: ["ekmek"],
  category: "misc",
  execute: async (msg) => {
    const url = "https://meme-api.herokuapp.com/gimme";

    const res = await axios.get(url);
    const meme: Meme = res.data;

    const embed = new MessageEmbed()
      .setAuthor(
        meme.subreddit,
        "https://blog.lastpass.com/wp-content/uploads/sites/20/2020/04/reddit-logo-2.jpg",
        `https://www.reddit.com/r/${meme.subreddit}/`
      )
      .setColor("GREEN")
      .setTitle(meme.title)
      .setURL(meme.postLink)
      .setDescription("Posted by " + meme.author)
      .setImage(meme.url)
      .setFooter(meme.ups + " 👍");

    await msg.reply({
      embeds: [embed],
    });
  },
});

export default cmd;
