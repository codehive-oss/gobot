import { createPopMessage } from "../../utils/createPopMessage";
import { Command } from "../../utils/Command";

const cmd = new Command({
  name: "pop",
  description: "POP YES",
  aliases: ["bubblewrap"],
  category: "misc",
  usage: "pop",
  execute: async (msg, args: string[]) => {
    // set args to number x and number y
    const x = args[0] ? parseInt(args[0]) : 5;
    const y = args[1] ? parseInt(args[1]) : 5;

    // check if x and y are numbers
    if (isNaN(x) || isNaN(y)) {
      msg.channel.send("Please enter a number");
      return;
    }

    // check if x and y are positive and under 10
    if (x <= 0 || y <= 0 || x > 10 || y > 10) {
      msg.channel.send("Please enter a number between 1 and 10");
      return;
    }

    const reply = createPopMessage(x, y);
    msg.reply(reply);
  },
});

export default cmd;
