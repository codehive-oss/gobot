import { Command } from "../../utils/Command";
import { MANAGE_MEMBERS } from "../../utils/GuildPermissions";
import { updateServer } from "@gobot/database";

export default new Command({
  name: "setanime",
  description: "Sets the Anime status of the guild",
  usage: "setanime <true/false>",
  category: "config",
  aliases: ["changeanime"],
  permissions: MANAGE_MEMBERS,
  async execute(message, args, server) {
    // set anime to true or false, when no args are provided, toggle it
    if (!args[0]) {
      server.anime = !server.anime;
    } else if (args[0] === "true") {
      server.anime = true;
    } else if (args[0] === "false") {
      server.anime = false;
    } else {
      message.reply("Please provide a valid argument, either true or false");
      return;
    }

    await updateServer(server);

    message.reply(`Anime status set to ${server.anime}`);
  },
});
