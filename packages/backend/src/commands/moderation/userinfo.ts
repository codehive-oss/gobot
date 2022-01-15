import { Command } from "@utils/commandTypes/Command";
import { getTarget } from "@utils/getTarget";
import { MessageEmbed } from "discord.js";

const cmd = new Command({
  name: "userinfo",
  description: "Sends Information about a User",
  usage: "userinfo <@user>",
  category: "misc",
  execute: async (msg, _args) => {
    const target = getTarget(msg);
    const targetmember = msg.guild!.members.cache.find(
      (user) => user.id == target.id
    );
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor({
        name: msg.author.username,
        iconURL: msg.author.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(target.displayAvatarURL({ dynamic: true }))
      .setTitle("Userinfo: " + target.tag)
      .addField("id", target.id)
      .addField("Bot", String(target.bot))
      .addField("Created At", target.createdAt.toDateString());

    if (targetmember) {
      embed.addField(
        "Status",
        targetmember.presence ? targetmember.presence.status : "None"
      );
      embed.addField("Highest Role", targetmember.roles.highest.name);
      embed.addField("Joined at", targetmember.joinedAt!.toDateString());
    }

    await msg.reply({ embeds: [embed] });
  },
});

export default cmd;
