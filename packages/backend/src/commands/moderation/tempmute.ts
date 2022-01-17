import { Command } from "@utils/commandTypes/Command";
import { convertTimeToDate } from "@utils/convertTime";
import { MANAGE_MESSAGE } from "@utils/GuildPermissions";
import { penaltyEmbed, tempMuteMember } from "@utils/moderation/penalty";

export default new Command({
  name: "tempmute",
  description: "Temporarily mute a user",
  usage: "tempmute <user> <reason> <time>",
  aliases: ["tmute"],
  category: "moderation",
  permissions: MANAGE_MESSAGE,
  execute: async (msg, args) => {
    const member = msg.mentions?.members?.first();
    if (!member) {
      msg.reply("Please mention a user");
      return;
    }

    const [, reason, timeArg] = args;
    if (!reason) {
      msg.reply("Please provide a reason");
    }

    if (!timeArg) {
      msg.reply("Please provide a time");
      return;
    }

    const expiresAt = convertTimeToDate(timeArg);

    if (!expiresAt) {
      msg.reply("Please provide a valid time format");
      return;
    }

    await tempMuteMember(member, reason, expiresAt);

    const embed = penaltyEmbed("Mute", member, reason, timeArg);
    msg.channel.send({ embeds: [embed] });
  },
});
