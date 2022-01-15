import { Command } from "@utils/commandTypes/Command";
import { BUILD_MODE, PACKAGE_VERSION } from "@utils/constants";
import { MessageEmbed } from "discord.js";

export default new Command({
  name: "version",
  aliases: ["ver"],
  description: "Sends the bots version",
  execute: (msg) => {
    const version = "v" + PACKAGE_VERSION;
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("GoBot Version")
      .addField("Version", "`" + version + "`")
      .addField("Build", "`" + BUILD_MODE + "`")

    msg.channel.send({embeds: [embed]});
  },
});
