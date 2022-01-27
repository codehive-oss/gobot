import { Command } from "../../utils/Command";
import { MessageEmbed } from "discord.js";
import { getTargetMember, getTargetUser } from "../../utils/getTarget";

const cmd = new Command({
  name: "userinfo",
  description: "Sends Information about a User",
  usage: "userinfo <@user>",
  category: "misc",
  execute: async (msg, _args) => {
    const targetUser = getTargetUser(msg);

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor({
        name: msg.author.username,
        iconURL: msg.author.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
      .setTitle("Userinfo: " + targetUser.tag)
      .addField("id", targetUser.id)
      .addField("Bot", String(targetUser.bot))
      .addField("Created At", targetUser.createdAt.toDateString());

    const targetMember = getTargetMember(msg);
    if (!targetMember) {
      msg.channel.send("You must mention a user to get their info");
      return;
    }
    embed.addField(
      "Status",
      targetMember.presence ? targetMember.presence.status : "None"
    );
    embed.addField("Highest Role", targetMember.roles.highest.name);
    embed.addField("Joined at", targetMember.joinedAt!.toDateString());

    await msg.reply({ embeds: [embed] });
  },
});

export default cmd;
