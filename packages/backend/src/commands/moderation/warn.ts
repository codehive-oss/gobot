import { Command } from "@utils/commandTypes/Command";
import { MANAGE_MESSAGE } from "@utils/GuildPermissions";
import { penaltyEmbed, warnMember } from "@utils/moderation/penalty";

export default new Command({
  name: "warn",
  description: "Warn a user",
  usage: "warn <user> <reason>",
  category: "moderation",
  aliases: ["warning"],
  permissions: MANAGE_MESSAGE,
  execute: async (msg, args) => {
    const member = msg.mentions?.members?.first();
    if (!member) {
      msg.reply("Please mention a user");
      return;
    }

    const [, reason] = args;
    if (!reason) {
      msg.reply("Please provide a reason");
      return;
    }

    let embed;
    if (await warnMember(member, reason)) {
      // member has been muted
      embed = penaltyEmbed("Mute", member, reason, "1 hour");
    } else {
      embed = penaltyEmbed("Warn", member, reason);
    }

    msg.channel.send({ embeds: [embed] });
  },
});
