import { maxwords } from "../../utils/maxwords";
import {
  decrementHandBalance,
  incrementHandBalance,
  toGoUser,
} from "../../db/entities/GoUser";
import { Command } from "../../utils/commandTypes";

const cmd = new Command({
  name: "give",
  description: "Give money to a user.",
  category: "economy",
  usage: "give <@user> <amount|all>",
  execute: async function (msg, args) {
    if (!args[0]) {
      msg.reply("Please specify a user.");
      return;
    }

    if (!args[1]) {
      msg.reply("Please specify an amount.");
      return;
    }

    const dcTarget = msg.mentions.users.first();
    const dcUser = msg.author;

    if (!dcTarget) {
      msg.reply("Please specify a user.");
      return;
    }

    const user = await toGoUser(dcUser.id);
    const target = await toGoUser(dcTarget.id);

    let amount: number;
    let er = /^-?[0-9]+$/;
    if (er.test(args[1])) {
      amount = Number(args[1]);
    } else {
      if (maxwords.includes(args[1])) {
        amount = user.handBalance;
      } else {
        msg.reply("Please specify a valid amount.");
        return;
      }
    }

    if (amount <= 0) {
      msg.reply("Please specify a value higher than 0.");
      return;
    }

    if (amount > user.handBalance) {
      msg.reply("You don't have enough money on hand.");
      return;
    }

    await decrementHandBalance(user, amount);
    await incrementHandBalance(target, amount);

    msg.reply(`You gave ${amount}$ to ${dcTarget.username} `);
  },
});

export default cmd;
