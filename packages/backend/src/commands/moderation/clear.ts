import {Command} from "../../utils/commandTypes";
import {messageperms} from "../../utils/GuildPermissions";
import {TextChannel} from "discord.js";

const cmd : Command = {
    name: "clear",
    aliases: ["purge"],
    description: "Deletes messages from the specified channel.",
    category: "moderation",
    usage: "purge [amount]",
    permissions: messageperms,
    execute: async  (msg, args) => {
        let amount= parseInt(args[0])
        if(!amount || Number.isNaN(amount)) {
            amount = 1
        }
        await (msg.channel as TextChannel).bulkDelete(amount)
        await msg.channel.send(`Cleared ${amount} messages`)

    }
}

module.exports = cmd;