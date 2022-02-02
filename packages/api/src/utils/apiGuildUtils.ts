import axios from "axios";
import { APIGuild, PermissionFlagsBits } from "discord-api-types/payloads/v9";
import { GoUser } from "@gobot/database";
import { DISCORD_API_ENDPOINT } from "@gobot/environment";

export const isGuildAdmin = (guild: APIGuild) => {
  return (
    guild.permissions &&
    BigInt(parseInt(guild.permissions)) & PermissionFlagsBits.Administrator
  );
};

export const getUserAdminGuild = async (serverID: string, goUser: GoUser) => {
  // TODO: Optimize this to only get one guild from user
  const res = await axios.get(`${DISCORD_API_ENDPOINT}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${goUser.accessToken}` },
  });

  const servers = res.data as APIGuild[];
  const server = servers.find((s) => s.id === serverID && isGuildAdmin(s));

  return server;
};

export const checkUserAdminGuild = async (serverID: string, goUser: GoUser) => {
  const server = await getUserAdminGuild(serverID, goUser);
  return !!server;
};
