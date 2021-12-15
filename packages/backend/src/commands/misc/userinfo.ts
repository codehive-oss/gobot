import { Command } from "../../utils/commandTypes";
import { getTarget } from "../../utils/getTarget";
import { MessageEmbed } from "discord.js";

const cmd = new Command({
  name: "userinfo",
  description: "Sends Information about a User",
  usage: "userinfo <@user>",
  category: "misc",
  execute: async (msg, args) => {
    const target = getTarget(msg);
    const targetmember = msg.guild!.members.cache.find(
      (user) => user.id == target.id
    );
    const embed = new MessageEmbed();

    embed.setColor("BLUE");
    embed.setAuthor(
      msg.author.username,
      msg.author.displayAvatarURL({ dynamic: true })
    );
    embed.setThumbnail(target.displayAvatarURL({ dynamic: true }));
    embed.setTitle("Userinfo: " + target.tag);
    embed.addField("id", target.id);
    embed.addField("Bot", String(target.bot));
    embed.addField("Created At", target.createdAt.toDateString());

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
