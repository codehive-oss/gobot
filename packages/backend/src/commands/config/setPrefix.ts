import { Command } from "@utils/commandTypes/Command";
import { manageMemberPermission } from "@utils/GuildPermissions";
import { updateServer } from "@db/entities/GoServer";

export default new Command({
  name: "setprefix",
  description: "Sets the prefix of the guild",
  usage: "setprefix <prefix>",
  category: "config",
  aliases: ["changeprefix"],
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
