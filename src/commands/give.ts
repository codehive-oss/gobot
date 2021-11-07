import { decrementHandBalance, incrementHandBalance, toGoUser } from "../db/entity/GoUser";
import { Command } from "../utils/types";

const cmd: Command = {
  name: "give",
  description: "Give money to a user.",
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
    const amount = Number(args[1]);

    if (isNaN(amount)) {
      msg.reply("Please specify a valid amount.");
      return;
    }

    if (amount <= 0) {
      msg.reply("Please specify a value higher than 0.");
      return;
    }

    if (!dcTarget) {
      msg.reply("Please specify a user.");
      return;
    }

    const user = await toGoUser(dcUser);
    const target = await toGoUser(dcTarget);

    if(amount > user.handBalance) {
      msg.reply("You don't have enough money on hand.");
      return;
    }

    await decrementHandBalance(user, amount);
    await incrementHandBalance(target, amount);

    msg.reply(`You gave ${amount}$ to ${dcTarget.username} `);
  },
};

module.exports = cmd;