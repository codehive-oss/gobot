import { Command } from "../../utils/commandTypes";
import { memberPerms } from "../../utils/GuildPermissions";
import { MessageEmbed } from "discord.js";
import { client } from "../../utils/client";

const rolename = "gomuted";

const cmd = new Command({
  name: "unmute",
  description: "unmutes a Member",
  category: "moderation",
  usage: "unmute [@member] <reason>",
  permissions: memberPerms,
  execute: async (msg, args) => {
    const guild = msg.guild;
    if (!guild) return;

    const target = msg.mentions.users.first();

    if (!target) {
      await msg.reply("Please provide a valid member");
      return;
    }

    const targetMember = guild.members.cache.find(
      (u) => u.id == msg.mentions.users.first()!.id
    );

    if (!targetMember) return;

    if (!targetMember.roles.cache.find((r) => r.name == rolename)) {
      await msg.reply("That member isn't muted");
      return;
    }

    await targetMember.roles.remove(
      guild.roles.cache.find((r) => r.name == rolename)!
    );

    let reason = "";
    if (args.length > 1) {
      for (let i = 1; i < args.length; i++) {
        reason += args[i];
      }
    }
    await msg.reply({
      embeds: [unmuteEmbed(target.username, reason ? reason : "None")],
    });
  },
});

export const unmuteEmbed = (user: string, reason: string) => {
  return new MessageEmbed()
    .setAuthor(client.user!.username, client.user!.displayAvatarURL())
    .setColor("BLUE")
    .setTitle(`${user} has been unmuted`)
    .addField("Reason", reason);
};

module.exports = cmd;
