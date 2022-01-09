import { Command } from "@utils/commandTypes";
import { decodeMorse, encodeMorse } from "@utils/morse";

const cmd = new Command({
  name: "morse-decode",
  description: "Decodes the provided morse code",
  category: "misc",
  execute: async (msg, args) => {
    await msg.reply(decodeMorse(args.join(" ")));
  },
});

export default cmd;
