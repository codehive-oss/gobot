import { GoUser } from "@db/entities/GoUser";
import { Command } from "@utils/commandTypes";
import { maxwords } from "@utils/maxwords";

const cmd = new Command({
  name: "deposit",
  description: "Deposit money into your bank account.",
  category: "economy",
  aliases: ["dep"],
  usage: "deposit <amount|all|max>",
  async execute(msg, args) {
    const goUser = await GoUser.toGoUser(msg.author.id);
    if (args[0]) {
      // Check if argument is a number
      let er = /^-?[0-9]+$/;
      if (er.test(args[0])) {
        const amount = parseInt(args[0]);

        // Check if amount is valid
        if (amount > 0) {
          // Check if the user has enough money to deposit
          if (goUser.handBalance < amount) {
            await msg.reply("You don't have that much money.");
            return;
          }
          goUser.deposit(amount);
          goUser.save();

          await msg.reply(
            `You've deposited ${amount} GoCoins into your bank account.`
          );
        } else {
          await msg.reply(`You can't deposit negative GoCoins.`);
        }
      } else {
        // Check if user wants to deposit all their money
        if (maxwords.includes(args[0])) {
          goUser.deposit(goUser.handBalance);
          goUser.save();

          await msg.reply(
            `You've deposited all of your GoCoins into your bank account.`
          );
        } else {
          await msg.reply("Invalid argument");
        }
      }
    } else {
      await msg.reply(`You need to specify an amount of GoCoins to deposit.`);
    }
  },
});

export default cmd;
