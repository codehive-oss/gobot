import { Client, Intents, MessageEmbed, TextChannel } from "discord.js";
import {
  handleMessage,
  handleReactionAdd,
  handleReactionRemove,
} from "./commandHandler";
import { DEFAULT_PREFIX } from "@gobot/environment";
import { createServers, getWelcomeChannel, toGoServer } from "@gobot/database";
import { logger } from "@gobot/logger";
import { ReactionRoleMessage } from "@gobot/database";
import { checkTempPenalties } from "../utils/penalty";
import { mention } from "../utils/mention";

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
  partials: ["MESSAGE", "REACTION"],
});

client.on("error", (e) => logger.error(e.message));
client.on("warn", (w) => logger.warn(w));

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

  // check for temp penalties
  const checkPenalties = async () => {
    await checkTempPenalties();
    setTimeout(checkPenalties, 1000 * 60); // check again in 1 minute
  };
  checkPenalties();
});

client.on("messageCreate", async (message) => {
  await handleMessage(message);
});

client.on("messageDelete", async (message) => {
  // find all reaction messages with the same message id
  const reactionRoleMessages = await ReactionRoleMessage.find({
    where: { messageID: message.id },
  });

  if (reactionRoleMessages.length > 0) {
    // delete all reaction messages
    await ReactionRoleMessage.delete(reactionRoleMessages.map((r) => r.id));
  }
});

client.on("messageDeleteBulk", async (messages) => {
  // find all reaction messages with the same message id
  const reactionRoleMessages = await ReactionRoleMessage.find({
    where: { messageID: messages.map((m) => m.id) },
  });

  if (reactionRoleMessages.length > 0) {
    // delete all reaction messages
    await ReactionRoleMessage.delete(reactionRoleMessages.map((r) => r.id));
  }
});

client.on("guildCreate", async (guild) => {
  await toGoServer(guild.id);

  const owner = await guild.fetchOwner();

  const embed = new MessageEmbed()
    .setTitle("Thank you for using GoBot!")
    .setDescription(
      `Hello ${owner.displayName}, thank you for adding me to your server!\n\n` +
        `I am a bot that helps you manage your server.\n\n` +
        `To get started, use the command \`${DEFAULT_PREFIX}help\` to see a list of commands.\n\n` +
        `You can also look for some help on the [GoBot website](https://www.go-bot.xyz) or [GoBot support server](https://discord.gg/GoBot).`
    )
    .setFooter("GoBot");

  await owner.user.send({ embeds: [embed] });
});

// TODO: Better Permssion Error handling
client.on("messageReactionAdd", async (reaction, user) => {
  try {
    if (reaction.message.partial || reaction.partial || user.partial)
      await reaction.fetch();
    if (reaction.partial || user.partial || user.bot) return;

    await handleReactionAdd(reaction, user);
  } catch (e) {}
});

// TODO: Better Permssion Error handling
client.on("messageReactionRemove", async (reaction, user) => {
  try {
    if (reaction.message.partial || reaction.partial || user.partial)
      await reaction.fetch();
    if (reaction.partial || user.partial) return;

    await handleReactionRemove(reaction, user);
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
