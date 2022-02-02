import { Command } from "../../utils/Command";
import { MANAGE_MESSAGE } from "../../utils/GuildPermissions";
import {
  penaltyDMEmbed,
  penaltyGuildEmbed,
  warnMember,
} from "../../utils/penalty";

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
    const reason = args.slice(1).join(" ") || "No reason provided";

    let guildEmbed;
    let dmEmbed;
    if (await warnMember(member, reason)) {
      // member has been muted
      guildEmbed = penaltyGuildEmbed("Mute", member, reason, "1h");
      if (msg.guild) dmEmbed = penaltyDMEmbed("Mute", reason, msg.guild, "1h");
    } else {
      guildEmbed = penaltyGuildEmbed("Warn", member, reason);
      if (msg.guild) dmEmbed = penaltyDMEmbed("Warn", reason, msg.guild);
    }

    msg.channel.send({ embeds: [guildEmbed] });
    if (dmEmbed) member.send({ embeds: [dmEmbed] });
  },
});
