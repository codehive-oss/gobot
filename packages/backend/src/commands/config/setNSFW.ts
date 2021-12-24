import { Command } from "@utils/commandTypes";
import { manageMemberPermission } from "@utils/GuildPermissions";
import { updateServer } from "@db/entities/GoServer";

export default new Command({
  name: "setNSFW",
  description: "Sets the NSFW status of the guild",
  usage: "setNSFW <true/false>",
  category: "config",
  aliases: ["changeNSFW"],
  permissions: manageMemberPermission,
  async execute(message, args, server) {
    // set nsfw to true or false, when no args are provided, toggle it
    if (!args[0]) {
      server.nsfw = !server.nsfw;
    } else if (args[0] === "true") {
      server.nsfw = true;
    } else if (args[0] === "false") {
      server.nsfw = false;
    } else {
      message.reply("Please provide a valid argument, either true or false");
      return;
    }

    await updateServer(server);

    message.reply(`NSFW status set to ${server.nsfw}`);
  },
});
