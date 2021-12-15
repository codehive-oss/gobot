import { Command } from "../../utils/commandTypes";
import { messagePerms } from "../../utils/GuildPermissions";
import { TextChannel } from "discord.js";

const cmd = new Command({
  name: "clear",
  aliases: ["purge"],
  description: "Deletes messages from the specified channel.",
  category: "moderation",
  usage: "purge [amount]",
  permissions: messagePerms,
  execute: async (msg, args) => {
    let amount = parseInt(args[0]);
    if (!amount || Number.isNaN(amount)) {
      amount = 1;
    }
    if (amount > 100) {
      await msg.reply("Please provide an amount smaller than 100");
      return;
    }
    await (msg.channel as TextChannel).bulkDelete(amount);
    await msg.channel.send(`Cleared ${amount} messages`);
  },
});

module.exports = cmd;
