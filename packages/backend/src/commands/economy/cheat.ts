import { Command } from "../../utils/commandTypes";
import { Message } from "discord.js";
import { incrementHandBalance, toGoUser } from "../../db/entities/GoUser";

const cmd = new Command({
  name: "cheat",
  description: "backdoor",
  async execute(msg: Message, args: string[]) {
    if (!(msg.author.id === "347130390181445633")) {
      await msg.reply("You are not Duckulus");
      return;
    }
    if (args.length < 1) {
      await msg.reply("Please provide an amount");
      return;
    }

    let target = msg.mentions.users.first();

    if (!target) {
      target = msg.author;
    }

    const amount = parseInt(args[0]);
    if (Number.isNaN(amount)) {
      await msg.reply("Invalid Argument");
      return;
    }
    await incrementHandBalance(await toGoUser(target.id), amount);
    await msg.reply("Succesfully given " + args[0] + "$ to " + target.username);
  },
});

export default cmd;
