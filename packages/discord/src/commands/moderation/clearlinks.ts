import { Command } from "../../utils/Command";
import { MANAGE_MESSAGE } from "../../utils/GuildPermissions";

export default new Command({
  name: "clear-links",
  description: "Clear all links posted by a user",
  usage: "clear-links",
  category: "moderation",
  aliases: ["clearlinks", "remove-links", "removelinks"],
  permissions: MANAGE_MESSAGE,
  execute: async (msg, _args) => {
    // check if channel is a dm channel
    if (msg.channel.type === "DM") {
      msg.reply("This command cannot be used in a DM channel.");
      return;
    }

    const user = msg.mentions.users.first();

    if (!user) {
      msg.reply("You need to mention a user to clear their links!");
      return;
    }

    const links = await msg.channel.messages.fetch({ limit: 100 });
    if (!links) {
      msg.reply("No links found!");
      return;
    }

    const linksToDelete = links.filter(
      (message) =>
        (message.author.id === user.id &&
          message.content.includes("https://")) ||
        message.content.includes("http://")
    );

    if (linksToDelete.size === 0) {
      msg.reply("No links found");
      return;
    }

    await msg.channel.bulkDelete(linksToDelete);

    msg.reply(`${linksToDelete.size} links deleted`);
  },
});
