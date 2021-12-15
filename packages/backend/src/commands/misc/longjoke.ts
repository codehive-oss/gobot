import { Command } from "../../utils/commandTypes";
import fs from "fs";

const joke = fs.readFileSync("assets/longjoke.txt", "utf8");
const words = joke.split(" ");

const cmd = new Command({
  name: "longjoke",
  description: "Sends a long joke",
  category: "misc",
  execute: async (msg, args, server) => {
    let start = 1;
    if (args[0] && !Number.isNaN(parseInt(args[0]))) {
      start = parseInt(args[0]);
    }

    let text = "";
    const wordcount = 50;
    const from = start == 1 ? 0 : (start - 1) * wordcount - 1;
    const to = start == 1 ? wordcount : (start - 1) * wordcount + wordcount;
    for (let i = from; i < to; i++) {
      if (words[i] !== undefined) {
        text += words[i] + " ";
      }
    }

    await msg.reply(
      `${text} \n \`\`\`| Use ${server.prefix}longjoke ${
        (start as number) + 1
      } to continue\`\`\``
    );
  },
});

export default cmd;
