import { deposit, toGoUser } from "../db/entity/GoUser";
import { Command } from "../utils/types";

const cmd: Command = {
  name: "deposit",
  description: "Deposit money into your bank account.",
  aliases: ["dep"],
  async execute(msg, args) {
    const goUser = await toGoUser(msg.author);
    if (args[0]) {
      // Check if argument is a number
      var er = /^-?[0-9]+$/;
      if (er.test(args[0])) {
        const amount = parseInt(args[0]);

        // Check if amount is valid
        if (amount > 0) {
          // Check if the user has enough money to deposit
          if (goUser.handBalance < amount) {
            msg.reply("You don't have that much money.");
            return;
          }
          deposit(goUser, amount);
          msg.reply(`You've deposited ${amount} coins into your bank account.`);
        } else {
          msg.reply(`You can't deposit negative coins.`);
        }
      } else {
        // Check if user wants to deposit all their money
        if (args[0] === "all") {
          deposit(goUser, goUser.handBalance);
          msg.reply(
            `You've deposited all of your coins into your bank account.`
          );
        } else {
          msg.reply("Invalid argument");
        }
      }
    } else {
      msg.reply(`You need to specify an amount of coins to deposit.`);
    }
  },
};

module.exports = cmd;
