import {Command} from "../../utils/types";
import {Message, MessageEmbed} from "discord.js";
import {toGoUser} from "../../db/entity/GoUser";

const cmd: Command = {
    name: "rank",
    description: "shows your rank",
    aliases: ["level", "xp"],
    usage: "rank",
    category: "level",
    async execute(msg: Message, _args: string[]) {
        let target = msg.mentions.users.first()
        if(!target) {
            target = msg.author
        }

        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(target.username + "'s Rank")

        if(target.avatarURL()) {
            embed.setThumbnail(target.avatarURL()!)
        }
        const user = await toGoUser(target)
        embed.addField("Expierence", user.xp + "xp")

        await msg.reply({embeds: [embed]})
    }
}

module.exports = cmd