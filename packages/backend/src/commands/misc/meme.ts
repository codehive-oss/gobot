import {Command} from "../../utils/commandTypes";
import {MessageEmbed} from "discord.js";
import axios from "axios";

const cmd: Command = {
    name: "meme",
    description: "Sends a meme",
    usage: "meme",
    aliases: ["ekmek"],
    category: "misc",
    execute: async (msg, args) => {
        const url = "https://meme-api.herokuapp.com/gimme"

        const resp = await axios.get(url)

        await msg.reply({
            embeds: [new MessageEmbed()
                .setAuthor(resp.data.subreddit,
                    "https://blog.lastpass.com/wp-content/uploads/sites/20/2020/04/reddit-logo-2.jpg",
                    `https://www.reddit.com/r/${resp.data.subreddit}/`)
                .setColor("GREEN")
                .setTitle(resp.data.title)
                .setURL(resp.data.postLink)
                .setDescription("A Meme for you")
                .setImage(resp.data.url)
            ]
        })

    }

}

module.exports = cmd