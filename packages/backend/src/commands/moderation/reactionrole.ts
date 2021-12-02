import { Command } from "../../utils/commandTypes";
import { messagePerms } from "../../utils/GuildPermissions";
import {MessageEmbed, TextChannel} from "discord.js";
import fs from "fs";
import {reactionRolesConfig} from "../../utils/client";

const cmd: Command = {
    name: "reactionrole",
    description: "Creates a selfrole message.",
    category: "moderation",
    usage: "reactionrole [emoji] [roleid]",
    permissions: messagePerms,
    execute: async (msg, args) => {
        if(!msg.guild) return;
            if(args.length == 2){
                let emoji = args[0];
                let roleid = args[1]
                let role = msg.guild.roles.cache.get(roleid);
                if(!role){
                    await msg.reply('Role not found')
                    return;
                }
                let embed = new MessageEmbed()
                    .setTitle('React with ' + emoji)
                    .setDescription('Press ' + emoji + " to get the " + `<@&${role.id}>` + " role or to remove it");
                let message = await msg.channel.send({embeds: [embed]})
                message.react(emoji)
                let toSave: any = {message: message.id, emoji: emoji,role: roleid}
                if(!reactionRolesConfig.reactions) {
                    reactionRolesConfig.reactions = []
                }
                reactionRolesConfig.reactions.push(toSave);
                let data = JSON.stringify(reactionRolesConfig);
                fs.writeFileSync('reactionroles.json', data);
            }
    },
};

module.exports = cmd;
