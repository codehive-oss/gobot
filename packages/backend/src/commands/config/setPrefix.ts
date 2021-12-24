import { Command } from "@utils/commandTypes";
import { manageMemberPermission } from "@utils/GuildPermissions";
import { updateServer } from "@db/entities/GoServer";

export default new Command({
  name: "setPrefix",
  description: "Sets the prefix of the guild",
  usage: "setPrefix <prefix>",
  category: "config",
  aliases: ["changePrefix"],
  permissions: manageMemberPermission,
  async execute(message, args, server) {
    if (!args[0]) {
      message.reply(
        "Please provide a valid argument, the prefix can't be empty!"
      );
      return;
    }

    server.prefix = args.join(" ");
    await updateServer(server);

    message.reply(`Prefix set to ${server.prefix}`);
  },
});
