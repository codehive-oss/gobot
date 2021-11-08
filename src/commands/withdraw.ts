import {toGoUser, withdraw} from "../db/entity/GoUser";
import {Command} from "../utils/types";
import {maxwords} from "../utils/maxwords";

const cmd: Command = {
    name: "withdraw",
    category: "economy",
    description: "Withdraws money from your bank account.",
    usage: "withdraw <amount|all>",
    aliases: ["with", "wd"],
    async execute(msg, args) {
        const goUser = await toGoUser(msg.author);

        if (args[0]) {
            // Check if argument is a number
            let er = /^-?[0-9]+$/;
            if (er.test(args[0])) {
                const amount = parseInt(args[0]);

                // Check if amount is valid
                if (amount > 0) {
                    // Check if user has enough money
                    if (goUser.bankBalance < amount) {
                        await msg.reply("You don't have that much money.");
                        return;
                    }
                    await withdraw(goUser, amount);
                    await msg.reply(`You withdrew ${amount} from your bank account.`);
                } else {
                    await msg.reply("You can't withdraw a negative amount.");
                    return;
                }
            } else {
                // Check all money should be withdrawn
                if (maxwords.includes(args[0])) {
                    await withdraw(goUser, goUser.bankBalance);
                    await msg.reply(`You withdrew all your money.`);
                } else {
                    await msg.reply("Invalid argument");
                }
            }
        } else {
            await msg.reply("You need to specify an amount.");
        }
    },
};

module.exports = cmd;
