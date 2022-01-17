import { Command } from "@utils/commandTypes/Command";
import {
  ADMIN,
  hasPermission,
  MANAGE_MEMBERS,
  MANAGE_MESSAGE,
} from "@utils/GuildPermissions";
import { MessageEmbed } from "discord.js";
import { client } from "@core/client";
import { isMuted, penaltyEmbed, muteMember } from "@utils/moderation/penalty";

const cmd = new Command({
  name: "mute",
  description: "Mutes a Member",
  category: "moderation",
  usage: "mute [@member] <reason>",
  permissions: MANAGE_MEMBERS,
  execute: async (msg, args) => {
    const target = msg.mentions.members?.first();

    if (!target) {
      await msg.reply("Please provide a valid member");
      return;
    }

    if (
      target.id == msg.author.id ||
      hasPermission(target!, MANAGE_MEMBERS, MANAGE_MESSAGE, ADMIN)
    ) {
      await msg.reply("You cannot mute a Moderator!");
      return;
    }

    if (isMuted(target)) {
      await msg.reply("That member is already muted!");
      return;
    }

    let reason = args.slice(1).join(" ") || "None";

    await muteMember(target, reason);

    const embed = penaltyEmbed("Mute", target, reason);
    await msg.reply({
      embeds: [embed],
    });
  },
});

export default cmd;
