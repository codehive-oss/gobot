import { Client, Intents } from "discord.js";
import { handle } from "./commandHandler";
import { __prod__, PREFIX } from "./constants";
import { getHelpEmbed } from "./getHelpEmbed";
import { createServer, toGoServer } from "../db/entities/GoServer";
import logger from "./logger";

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

if (!__prod__) {
  client.on("error", logger.error);
  client.on("warn", logger.warn);
}

client.on("ready", async () => {
  //save all servers the bot is on
  for (let guild of client.guilds.cache.values()) {
    console.log(guild.name);
    await createServer(guild.id);
  }

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
  await handle(message, server.prefix);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isSelectMenu() && interaction.customId === "help") {
    await interaction.reply({
      ephemeral: true,
      content: `<@${interaction.user.id}>`,
      embeds: [getHelpEmbed(interaction.values[0])],
    });
  }
});

client.on("guildCreate", async (guild) => {
  await createServer(guild.id);

  const owner = await guild.fetchOwner();
  await owner.user.send("test");
});
