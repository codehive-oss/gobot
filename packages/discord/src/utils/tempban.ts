import { Command } from "./Command";
import { convertTimeToMilliseconds } from "./convertTime";
import { MANAGE_MESSAGE } from "./GuildPermissions";
import {
  penaltyDMEmbed,
  penaltyGuildEmbed,
  tempBanMember,
} from "./penalty";

export default new Command({
  name: "tempban",
  description: "Temporarily ban a user",
  usage: "tempban <user> <time> <reason>",
  aliases: ["tban"],
  category: "moderation",
  permissions: MANAGE_MESSAGE,
  execute: async (msg, args) => {
    const member = msg.mentions.members?.first();
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

    const milliseconds = convertTimeToMilliseconds(timeArg);

    if (!milliseconds) {
      msg.reply("Please provide a valid time format");
      return;
    }

    await tempBanMember(member, reason, milliseconds);

    const embed = penaltyGuildEmbed("Ban", member, reason, timeArg);

    msg.channel.send({ embeds: [embed] });

    if (msg.guild) {
      const dmEmbed = penaltyDMEmbed("Ban", reason, msg.guild, timeArg);
      await member.send({
        embeds: [dmEmbed],
      });
    }
  },
});
