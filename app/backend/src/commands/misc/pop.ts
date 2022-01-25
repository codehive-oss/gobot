import { Command } from "@utils/commandTypes/Command";

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

    var reply = "";
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        reply += "||POP||";
      }
      reply += "\n";
    }
    msg.reply(reply);
  },
});

export default cmd;
