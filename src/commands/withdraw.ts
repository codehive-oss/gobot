import { upsert, withdraw } from "../db/entity/GoUser";
import { Command } from "../utils/types";

const cmd: Command = {
  name: "withdraw",
  description: "Withdraws money from your bank account.",
  aliases: ["with", "wd"],
  async execute(msg, args) {
    const goUser = await upsert(msg.author);

    if (args[0]) {

      // Check if argument is a number
      var er = /^-?[0-9]+$/;
      if (er.test(args[0])) {
        const amount = parseInt(args[0]);

        // Check if amount is valid
        if (amount > 0) {
          // Check if user has enough money
          if (goUser.bankBalance < amount) {
            msg.reply("You don't have that much money.");
            return;
          }
          withdraw(goUser, amount);
          msg.reply(`You withdrew ${amount} from your bank account.`);
        } else {
          msg.reply("You can't withdraw a negative amount.");
          return;
        }
      } else {
        // Check all money should be withdrawn
        if (args[0] === "all") {
          withdraw(goUser, goUser.bankBalance);
          msg.reply(`You withdrew all your money.`);
        } else {
          msg.reply("Invalid argument");
        }
      }
    } else {
      msg.reply("You need to specify an amount.");
    }
  },
};

module.exports = cmd;
