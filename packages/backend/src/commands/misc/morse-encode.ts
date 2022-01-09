import { Command } from "@utils/commandTypes";
import { encodeMorse } from "@utils/morse";

const cmd = new Command({
  name: "morse-encode",
  description: "Encodes the provided morse code",
  category: "misc",
  execute: async (msg, args) => {
    await msg.reply(encodeMorse(args.join(" ")));
  },
});

export default cmd;
