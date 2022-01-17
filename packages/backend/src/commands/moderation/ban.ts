import { Command } from "@utils/commandTypes/Command";
import { MANAGE_MESSAGE } from "@utils/GuildPermissions";
import { penaltyEmbed } from "@utils/moderation/penalty";

export default new Command({
  name: "ban",
  description: "Bans a user from the server.",
  category: "moderation",
  usage: "ban [user] [reason]",
  permissions: MANAGE_MESSAGE,
  execute: async (msg, args) => {
    const user = msg.mentions.members?.first();
    const reason = args.slice(1).join(" ");

    if (!user) {
      msg.reply("Please mention a user to ban.");
      return;
    }

    if (!reason) {
      msg.reply("Please specify a reason for the ban.");
      return;
    }

    msg.guild?.members.ban(user);
    
    const embed = penaltyEmbed("Ban", user, reason);

    msg.channel.send({ embeds: [embed] });
  },
});
