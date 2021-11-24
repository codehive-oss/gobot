import { Client, Intents } from "discord.js";
import { handleInteraction, handleMessage } from "./commandHandler";
import { __prod__, PREFIX } from "./constants";
import { createServers, toGoServer } from "../db/entities/GoServer";
import logger from "./logger";

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

if (!__prod__) {
  client.on("error", logger.error);
  client.on("warn", logger.warn);
}

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
        name: `${PREFIX}help`,
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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.guild) {
    return;
  }
  const server = await toGoServer(interaction.guild.id);
  handleInteraction(interaction, server);
});

client.on("guildCreate", async (guild) => {
  await toGoServer(guild.id);

  const owner = await guild.fetchOwner();
  await owner.user.send("test");
});
