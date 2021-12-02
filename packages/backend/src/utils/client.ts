import {Client, Intents} from "discord.js";
import {handleInteraction, handleMessage} from "./commandHandler";
import {__prod__, PREFIX} from "./constants";
import {createServers, toGoServer} from "../db/entities/GoServer";
import {logger} from "./logger";
import fs from "fs";


export const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES],
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

if (!fs.existsSync("reactionroles.json")) {
    fs.open("reactionroles.json", "w", (err => {
        if (err) {
            throw err
        }

        logger.info("Created Rection Role config file")
    }))
}
export let reactionRolesConfig: any


reactionRolesConfig = JSON.parse(fs.readFileSync('reactionroles.json', 'utf8')) || {}


client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot || !reaction.message.guild) return;

    for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
        let reactionrole = reactionRolesConfig.reactions[index];

        if (reaction.message.id == reactionrole.message && reaction.emoji.name == reactionrole.emoji) {
            await reaction.message.guild.members.cache.get(user.id)!.roles.add(reactionrole.role)
        }
    }
})

client.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot || !reaction.message.guild) return;

    for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
        let reactionrole = reactionRolesConfig.reactions[index];

        if (reaction.message.id == reactionrole.message && reaction.emoji.name == reactionrole.emoji && reaction.message.guild.members.cache.get(user.id)!.roles.cache.has(reactionrole.role)) {
            await reaction.message.guild.members.cache.get(user.id)!.roles.remove(reactionrole.role)
        }
    }
})
