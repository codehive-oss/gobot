import {deposit, toGoUser} from "../../db/entity/GoUser";
import {Command} from "../../utils/types";
import {maxwords} from "../../utils/maxwords";

const cmd: Command = {
    name: "deposit",
    description: "Deposit money into your bank account.",
    category: "economy",
    aliases: ["dep"],
    usage: "deposit <amount|all|max>",
    async execute(msg, args) {
        const goUser = await toGoUser(msg.author);
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
                    await deposit(goUser, amount);
                    await msg.reply(`You've deposited ${amount} coins into your bank account.`);
                } else {
                    await msg.reply(`You can't deposit negative coins.`);
                }
            } else {
                // Check if user wants to deposit all their money
                if (maxwords.includes(args[0])) {
                    await deposit(goUser, goUser.handBalance);
                    await msg.reply(
                        `You've deposited all of your coins into your bank account.`
                    );
                } else {
                    await msg.reply("Invalid argument");
                }
            }
        } else {
            await msg.reply(`You need to specify an amount of coins to deposit.`);
        }
    },
};

module.exports = cmd;
