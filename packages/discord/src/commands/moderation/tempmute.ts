import { Command } from "../../utils/Command";
import { convertTimeToDate } from "../../utils/convertTime";
import { MANAGE_MESSAGE } from "../../utils/GuildPermissions";
import {
  penaltyDMEmbed,
  penaltyGuildEmbed,
  tempMuteMember,
} from "../../utils/penalty";

export default new Command({
  name: "tempmute",
  description: "Temporarily mute a user",
  usage: "tempmute <user> <time> <reason>",
  aliases: ["tmute"],
  category: "moderation",
  permissions: MANAGE_MESSAGE,
  execute: async (msg, args) => {
    const member = msg.mentions?.members?.first();
    if (!member) {
      msg.reply("Please mention a user");
      return;
    }

    const [, timeArg, reasonArg] = args;
    const reason = reasonArg || "No reason provided";

    if (!timeArg) {
      msg.reply("Please provide a time");
      return;
    }

    const expiresAt = convertTimeToDate(timeArg);
    if (!expiresAt) {
      msg.reply("Please provide a valid time");
      return;
    }

    await tempMuteMember(member, reason, expiresAt);

    const embed = penaltyGuildEmbed("Mute", member, reason, timeArg);
    msg.channel.send({ embeds: [embed] });

    if (msg.guild) {
      const dmEmbed = penaltyDMEmbed("Mute", reason, msg.guild, timeArg);
      await member.send({
        embeds: [dmEmbed],
      });
    }
  },
});
