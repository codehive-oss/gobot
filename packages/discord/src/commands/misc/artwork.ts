// API docs located at:
// https://api.artic.edu/docs/

// API Endpoints:
// https://api.artic.edu/api/v1/artworks?query[term][is_public_domain]=true&fields=title,image_id,artist_display&limit=1&page=${pageNum}
// https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg

import { Command } from "../../utils/Command";
import { MessageEmbed } from "discord.js";
import axios from "axios";

const numArtworks = 4478;

interface Artwork {
  title: string;
  image_id: string;
  artist_display?: string;
}

export default new Command({
  name: "artwork",
  description: "Sends a random artwork",
  usage: "artwork",
  category: "misc",
  aliases: ["art"],
  async execute(message) {
    const randomIndex = Math.ceil(Math.random() * numArtworks);

    const res = await axios.get(
      `https://api.artic.edu/api/v1/artworks?query[term][is_public_domain]=true&fields=id,title,image_id,artist_display&limit=1&page=${randomIndex}`
    );
    const [artwork]: Artwork[] = res.data.data;

    const embed = new MessageEmbed()
      .setTitle(artwork.title)
      .setImage(
        `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
      );

    if (artwork.artist_display) embed.setFooter(artwork.artist_display);

    await message.reply({ embeds: [embed] });
  },
});
