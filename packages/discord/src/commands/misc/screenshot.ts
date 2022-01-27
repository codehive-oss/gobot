import axios from "axios";
import { MessageEmbed } from "discord.js";
import { Command } from "../../utils/Command";

const cmd = new Command({
  name: "screenshot",
  description: "screenshots the given webpage",
  category: "misc",
  execute: async (msg, args, server) => {
    if (!server.nsfw) {
      await msg.reply(
        "You can't use this command because NSFW is disabled on this server."
      );
      return;
    }
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
              await axios.get(
                `https://api.screensoap.com/screenshot?url=${url}`
              )
            ).data.file.url
          ),
        ],
      });
    } catch (e) {
      await msg.reply("Invalid URL");
    }
  },
});

export default cmd;
