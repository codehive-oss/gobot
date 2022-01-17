import { Command } from "@utils/commandTypes/Command";
import { convertTimeToMilliseconds } from "@utils/convertTime";
import { MANAGE_MESSAGE } from "@utils/GuildPermissions";
import { penaltyEmbed, tempBanMember } from "@utils/moderation/penalty";

export default new Command({
  name: "tempban",
  description: "Temporarily ban a user",
  usage: "tempban <user> <reason> <time>",
  aliases: ["tban"],
  category: "moderation",
  permissions: MANAGE_MESSAGE,
  execute: async (msg, args) => {
    const member = msg.mentions.members?.first();
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

    const milliseconds = convertTimeToMilliseconds(timeArg);

    if (!milliseconds) {
      msg.reply("Please provide a valid time format");
      return;
    }

    await tempBanMember(member, reason, milliseconds);

    const embed = penaltyEmbed("Ban", member, reason, timeArg);

    msg.channel.send({ embeds: [embed] });
  },
});
