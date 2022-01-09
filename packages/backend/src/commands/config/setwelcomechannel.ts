import { Command } from "@utils/commandTypes/Command";
import { manageMessagePermission } from "@utils/GuildPermissions";
import { setWelcomeChannel } from "@db/entities/GoServer";
import { TextChannel } from "discord.js";

const cmd = new Command({
  name: "setwelcomechannel",
  aliases: ["changewelcomechannel"],
  description: "Changes the channel",
  category: "config",
  usage: "setwelcomechannel <channel>",
  permissions: manageMessagePermission,
  execute: async (msg, args) => {
    if (!msg.guild) return;
    let channel: TextChannel;
    if (args[0] && args[0].startsWith("<")) {
      const channelId = args[0]
        .replace("<", "")
        .replace("#", "")
        .replace(">", "");
      channel = (await msg.guild.channels.cache.find(
        (value) => value.id == channelId
      )) as TextChannel;
      if (!channel) return;
    } else {
      channel = msg.channel as TextChannel;
    }
    if (channel) {
      await setWelcomeChannel(msg.guild.id, channel.id);
      await msg.reply(
        "Succesfully changed welcome channel to #" + channel.name
      );
      await channel.send("This is the new Channel for welcome messages!");
    }
  },
});

export default cmd;
