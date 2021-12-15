import { Client, Intents, TextChannel } from "discord.js";
import { handleMessage } from "./commandHandler";
import { DEFAULT_PREFIX } from "./constants";
import {
  createServers,
  getWelcomeChannel,
  toGoServer,
} from "../db/entities/GoServer";
import { logger } from "./logger";

import { getReactionRoleMessage } from "../db/entities/ReactionRoleMessage";
import { mention } from "./mention";
import { captureRejections } from "events";

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

client.on("error", logger.error);
client.on("warn", logger.warn);

client.on("ready", async () => {
  // save all servers the bot is on
  const serversCreated = await createServers(
    client.guilds.cache.map((g) => g.id)
  );
  logger.info(`${serversCreated} servers added.`);

  logger.info(`Logged in as ${client.user?.username}`);

  client.user?.setPresence({
    status: "online",
    activities: [
      {
        name: `${DEFAULT_PREFIX}help`,
        type: "LISTENING",
      },
      {
        name: "donda",
        type: "LISTENING",
      },
    ],
  });
});

client.on("messageCreate", async (message) => {
  if (!message.guild) {
    return;
  }
  const server = await toGoServer(message.guild.id);
  await handleMessage(message, server);
});

client.on("guildCreate", async (guild) => {
  await toGoServer(guild.id);

  const owner = await guild.fetchOwner();
  await owner.user.send("test");
});

client.on("messageReactionAdd", async (reaction, user) => {
  try {
    if (reaction.message.partial) await reaction.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot || !reaction.message.guild) return;

    const rmsg = await getReactionRoleMessage(reaction.message.id);
    if (!rmsg) return;
    logger.info(reaction.emoji.name);
    logger.info(rmsg.emoji);
    if (
      reaction.message.id == rmsg.messageid &&
      reaction.emoji.name == rmsg.emoji
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)!
        .roles.add(rmsg.roleid);
    }
  } catch (e) {}
});

client.on("messageReactionRemove", async (reaction, user) => {
  try {
    if (reaction.message.partial) await reaction.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot || !reaction.message.guild) return;

    const rmsg = await getReactionRoleMessage(reaction.message.id);
    if (!rmsg) return;

    if (
      reaction.message.id == rmsg.messageid &&
      reaction.emoji.name == rmsg.emoji
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)!
        .roles.remove(rmsg.roleid);
    }
  } catch (e) {}
});

client.on("guildMemberAdd", async (member) => {
  const channelid = await getWelcomeChannel(member.guild.id);
  const channel = member.guild.channels.cache.find(
    (value) => value.id == channelid
  ) as TextChannel;
  if (channel) {
    await channel.send(`${mention(member.id)} joined the Server!`);
  }
});
