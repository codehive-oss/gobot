import {Command} from "../utils/types";
import {Message} from "discord.js";
import {toGoUser} from "../db/entity/GoUser";
import {allItems} from "../utils/item";

const cmd: Command = {
    description: "Sells the specified item",
    async execute(msg: Message, args: string[]) {
        if (args.length < 1) {
            await msg.reply("Please provide an Item to Sell!")
            return
        }
        const itemname = args[0]


        let ore
        let oreIndex = 0
        for (const item of allItems) {
            if (item.name.toLocaleLowerCase() === itemname.toLocaleLowerCase()) {
                ore = item
                break
            }
            oreIndex++
        }
        if (ore === undefined) {
            await msg.reply("Item not found")
            return
        }

        const gouser = await toGoUser(msg.author)

        let amount
        if (args[1]) {

            if (args[1] === "max") {
                amount = gouser.items[oreIndex]
            }else {
                amount = parseInt(args[1])
            }

        } else {
            amount = 1
        }



        if (gouser.items[oreIndex] > amount - 1) {
            gouser.items[oreIndex] -= amount
            gouser.handBalance += ore.price * amount
            await gouser.save()
            await msg.reply(`Succesfully sold ${amount} ${ore.name} for ${ore.price * amount}`)
        } else {
            await msg.reply("You don't own that")
        }


    },
    name: "sell",
    usage: "sell [item] <amount>"

}

module.exports = cmd