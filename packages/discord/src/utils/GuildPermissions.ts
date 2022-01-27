import { GuildMember, Permissions } from "discord.js";

export type GuildPermissions = {
  perms: bigint[];
};

export const MANAGE_MESSAGE: GuildPermissions = {
  perms: [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.MANAGE_GUILD],
};

export const MANAGE_MEMBERS: GuildPermissions = {
  perms: [
    Permissions.FLAGS.MUTE_MEMBERS,
    Permissions.FLAGS.BAN_MEMBERS,
    Permissions.FLAGS.KICK_MEMBERS,
  ],
};

export const ADMIN: GuildPermissions = {
  perms: [Permissions.FLAGS.ADMINISTRATOR],
};

export function hasPermission(
  user: GuildMember,
  ...permissions: GuildPermissions[]
): boolean {
  for (let permission of permissions) {
    for (let perm of permission.perms) {
      if (user.permissions.has(perm)) {
        return true;
      }
    }
  }

  return false;
}
