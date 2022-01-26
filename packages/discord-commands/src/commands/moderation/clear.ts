import { Command } from "@utils/commandTypes/Command";
import { MANAGE_MESSAGE } from "@utils/GuildPermissions";
import { logger } from "@utils/logger";
import { TextChannel } from "discord.js";

const cmd = new Command({
  name: "clear",
  aliases: ["purge"],
  description: "Deletes messages from the specified channel.",
  category: "moderation",
  usage: "purge [amount]",
  permissions: MANAGE_MESSAGE,
  execute: async (msg, args) => {
    // convert first argument to number
    const amount = parseInt(args[0]);
    if (isNaN(amount)) {
      msg.reply("Please provide a valid number");
      return;
    }

    // check if number is positive
    if (amount <= 0) {
      msg.reply("Please provide a valid number");
      return;
    }

    // check if number is not too big
    if (amount > 5000) {
      msg.reply("Please provide a number less than 5000");
      return;
    }

    if (!(msg.channel instanceof TextChannel)) {
      msg.reply("This command can only be used in text channels.");
      return;
    }

    let messagesToDelete = amount;

    let old = false;
    while (messagesToDelete > 0) {
      const collected = await msg.channel.messages.fetch();
      if (collected.size <= 0) break;
      if (old) {
        for (let msg of collected.values()) {
          await msg.delete();
          messagesToDelete--;
        }
      } else {
        let deleted = await msg.channel.bulkDelete(
          Math.min(100, messagesToDelete),
          true
        );
        if (deleted.size < collected.size) old = true;
        messagesToDelete -= deleted.size;
      }
    }

    msg.channel.send(`Cleared ${amount - messagesToDelete} messages`);
  },
});

export default cmd;
