import { Command } from "../../utils/Command";
import { decodeMorse } from "../../utils/morse";

const cmd = new Command({
  name: "morse-decode",
  description: "Decodes the provided morse code",
  category: "misc",
  aliases: ["morsedecode"],
  execute: async (msg, args) => {
    if (args.length <= 0) {
      msg.reply("Please provide morse code to decode");
      return;
    }

    const decoded = decodeMorse(args.join(" "));

    if (!decoded) {
      msg.reply("Invalid morse code");
      return;
    }

    await msg.reply("`" + decoded + "`");
  },
});

export default cmd;
