import {GuildMember, Permissions} from "discord.js";

export type GuildPermissions = {
    perms: bigint[]
}

export const messageperms: GuildPermissions = {
    perms: [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.MANAGE_GUILD]
}

export const adminperms: GuildPermissions = {
    perms: [Permissions.FLAGS.ADMINISTRATOR]
}

export function hasPermission(user: GuildMember, permission: GuildPermissions) : boolean{
    for (let perm of permission.perms) {
        if(user.permissions.has(perm)) {
            return true;
        }
    }
    return false
}