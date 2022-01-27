import { Command } from "../../utils/Command";

const cmd = new Command({
  name: "pyramid",
  description: "Creates a Pyramid",
  usage: "pyramid <height>",
  category: "misc",
  execute: async (msg, args) => {
    const height = args[0] ? parseInt(args[0]) : 5;
    // Check if height is number
    if (isNaN(height)) {
      await msg.reply("Please enter a number");
      return;
    }
    // Check if height is positive and under 15
    if (height < 1) {
      await msg.reply("Please enter a number between 1 and 15");
      return;
    }

    const sum = (height * (height + 1)) / 2;
    const maxZeros = Math.floor(Math.log10(sum) + 1);
    let num = 1;
    let s = "```\n";
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < maxZeros * (height - i); j++) {
        s += " ";
      }

      for (let k = 0; k < i + 1; k++) {
        let z = Math.floor(Math.log10(num) + 1);
        let left = Math.floor((maxZeros * 2 - z) / 2);

        for (let j = 0; j < left + (z % 2 != 0 ? 1 : 0); j++) {
          s += "+";
        }
        s += num;
        for (let j = 0; j < left; j++) {
          s += "*";
        }
        num++;
      }
      s += "\n";
    }
    s += "```";
    try {
      await msg.reply(s);
    } catch (e) {
      await msg.reply("Invalid Argument");
    }
  },
});

export default cmd;
