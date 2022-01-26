import { Command } from "@utils/commandTypes/Command";
import { encodeMorse } from "@utils/morse";

const cmd = new Command({
  name: "morse-encode",
  description: "Encodes the provided morse code",
  category: "misc",
  aliases: ["morseencode"],
  execute: async (msg, args) => {
    if (args.length <= 0) {
      msg.reply("Please provide morse code to encode");
      return;
    }

    const encoded = encodeMorse(args.join(" "));

    if (!encoded) {
      msg.reply("Invalid morse input");
      return;
    }

    await msg.reply("`" + encoded + "`");
  },
});

export default cmd;
