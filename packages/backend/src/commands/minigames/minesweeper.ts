import { Command } from "@utils/commandTypes";
import { Message } from "discord.js";
import Minesweeper from "discord.js-minesweeper";

const cmd = new Command({
  name: "minesweeper",
  description: "Play a game of minesweeper",
  usage: "minesweeper <size>",
  category: "minigames",
  async execute(msg: Message, args: string[]) {
    let argsize;
    if (args[0] && !Number.isNaN(parseInt(args[0]))) {
      argsize = parseInt(args[0]);
    } else {
      argsize = 9;
    }

    const mine = new Minesweeper({
      columns: argsize,
      rows: argsize,
      returnType: "emoji",
    });
    try {
      await msg.reply(mine.start() as string);
    } catch (e) {
      await msg.reply("Invalid Argument");
    }
  },
});

export default cmd;
