import { Command } from "../../utils/Command";
import { MANAGE_MESSAGE } from "../../utils/GuildPermissions";
import { ask, askTextChannel } from "../../utils/interaction/ask";
import { MessageEmbed } from "discord.js";

export default new Command({
  name: "announce",
  description: "Announce a message to the server",
  usage: "announce",
  category: "moderation",
  aliases: ["announcement"],
  permissions: MANAGE_MESSAGE,
  execute: async (message, _args) => {
    const title = await ask("What is the title of the announcement?", message);
    const description = await ask(
      "What is the description of the announcement?",
      message
    );
    const channel = await askTextChannel(
      "What channel should the announcement be sent to?",
      message
    );
    if (!channel) return;

    const target = await ask(
      "What is the target of the announcement?",
      message
    );

    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor("GREEN");

    await channel.send({ content: target, embeds: [embed] });

    message.reply("Announcement sent!");
  },
});
