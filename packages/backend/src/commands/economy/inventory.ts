import {MessageEmbed} from "discord.js";
import {toGoUser} from "../../db/entities/GoUser";
import {allItems} from "../../utils/item";
import { Command } from "../../utils/commandTypes";

const cmd: Command = {
    name: "inventory",
    description: "View your inventory.",
    category: "economy",
    aliases: ["inv"],
    async execute(msg, args) {
        let target
        if (args.length === 0) {
            target = msg.author
        } else {
            target = msg.mentions.users.first()
        }

        if (target === undefined) {
            await msg.reply("Invalid Target")
            return
        }

        const user = await toGoUser(target);

        const embed = new MessageEmbed();
        embed.setColor("#528B8B");
        embed.setTitle(`:school_satchel: Inventory of ${target.username}`);
        if (target?.avatarURL()) {
            embed.setThumbnail(target.avatarURL()!);
        }
        for (let i = 0; i < user.items.length; i++) {
            const item = allItems[i];
            embed.addField(item.name, user.items[i].toString());
        }
        await msg.reply({embeds: [embed]});
    },
};

module.exports = cmd;
