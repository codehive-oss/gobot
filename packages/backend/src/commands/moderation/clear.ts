import { Command } from "@utils/commandTypes";
import { manageMessagePermission } from "@utils/GuildPermissions";
import { TextChannel } from "discord.js";

const cmd = new Command({
  name: "clear",
  aliases: ["purge"],
  description: "Deletes messages from the specified channel.",
  category: "moderation",
  usage: "purge [amount]",
  permissions: manageMessagePermission,
  execute: async (msg, args) => {
    // convert first argument to number
    const amount = parseInt(args[0]);
    if (isNaN(amount)) {
      await msg.reply("Please provide a valid number");
      return;
    }

    // check if number is positive
    if (amount <= 0) {
      await msg.reply("Please provide a valid number");
      return;
    }

    // get the channel
    const channel = msg.channel as TextChannel;
    const iterations = Math.floor(amount / 100);
    const remainder = amount % 100;
    for (let i = 0; i < iterations; i++) {
      await channel.bulkDelete(100);
    }
    await channel.bulkDelete(remainder);
    
    await channel.send(`Cleared ${amount} messages`);
  },
});

export default cmd;
