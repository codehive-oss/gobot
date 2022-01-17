import { Command } from "@utils/commandTypes/Command";
import { MANAGE_MEMBERS } from "@utils/GuildPermissions";
import { MessageEmbed } from "discord.js";
import { client } from "@core/client";
import {
  isMuted,
  MUTE_ROLE_NAME,
  penaltyDMEmbed,
  penaltyGuildEmbed,
  unmuteMember,
} from "@utils/moderation/penalty";
import { TempPenalty } from "@db/entities/moderation/TempPenalty";

const cmd = new Command({
  name: "unmute",
  description: "unmutes a Member",
  category: "moderation",
  usage: "unmute [@member] <reason>",
  permissions: MANAGE_MEMBERS,
  execute: async (msg, args) => {
    const target = msg.mentions.members?.first();

    if (!target) {
      await msg.reply("Please provide a valid member");
      return;
    }

    if (!isMuted(target)) {
      await msg.reply("That member isn't muted");
      return;
    }

    const reason = args.slice(1).join(" ") || "None";
    await unmuteMember(target, reason);

    // remove temporary mutes
    const penalty = await TempPenalty.findOne({
      where: {
        userID: target.id,
        guildID: msg.guild?.id,
        type: "Mute",
      },
    });
    penalty?.remove();

    const embed = penaltyGuildEmbed("Unmute", target, reason);
    await msg.reply({
      embeds: [embed],
    });

    if (msg.guild) {
      const dmEmbed = penaltyDMEmbed("Unmute", reason, msg.guild);
      await target.send({
        embeds: [dmEmbed],
      });
    }
  },
});

export default cmd;
