import { Command } from "@utils/commandTypes";
import { manageMemberPermission } from "@utils/GuildPermissions";
import { updateServer } from "@db/entities/GoServer";

export default new Command({
  name: "setAnime",
  description: "Sets the Anime status of the guild",
  usage: "setAnime <true/false>",
  category: "config",
  aliases: ["changeAnime"],
  permissions: manageMemberPermission,
  async execute(message, args, server) {
    // set nsfw to true or false, when no args are provided, toggle it
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
