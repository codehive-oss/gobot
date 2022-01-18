import { Command } from "@utils/commandTypes/Command";
import { MANAGE_MESSAGE } from "@utils/GuildPermissions";
import { penaltyDMEmbed, penaltyGuildEmbed } from "@utils/moderation/penalty";

export default new Command({
  name: "ban",
  description: "Bans a user from the server.",
  category: "moderation",
  usage: "ban <user> <reason>",
  permissions: MANAGE_MESSAGE,
  execute: async (msg, args) => {
    const user = msg.mentions.members?.first();
    const reason = args.slice(1).join(" ") || "No reason provided";

    if (!user) {
      msg.reply("Please mention a user to ban.");
      return;
    }

    msg.guild?.members.ban(user);
    
    const embed = penaltyGuildEmbed("Ban", user, reason);

    msg.channel.send({ embeds: [embed] });

    if (msg.guild) {
      const dmEmbed = penaltyDMEmbed("Ban", reason, msg.guild);
      await user.send({
        embeds: [dmEmbed],
      });
    }
  },
});
