import { Command } from "@utils/commandTypes";
import axios from "axios";
import { MessageEmbed } from "discord.js";

interface BuzzwordAPIResponse {
  phrase: string;
}

const buzzwordAPIEndpoint = "https://corporatebs-generator.sameerkumar.website";

export default new Command({
  name: "buzzword",
  description: "Sends a random buzzword",
  usage: "buzzword",
  category: "misc",
  execute: async (msg) => {
    const res = await axios.get(
      "https://corporatebs-generator.sameerkumar.website/"
    );

    const data: BuzzwordAPIResponse = res.data;

    // create embed with data
    const embed = new MessageEmbed().setColor("#0099ff").setTitle(data.phrase);

    // better way of showing this?
    // .setFooter(
    //   "Powered by https://corporatebs-generator.sameerkumar.website"
    // );

    // send embed
    await msg.channel.send({ embeds: [embed] });
  },
});
