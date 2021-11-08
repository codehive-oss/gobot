import {Client, Intents} from "discord.js";
import {handle} from "./commandHandler";
import {__prod__, PREFIX} from "./constants";
import {getHelpEmbed} from "./getHelpEmbed";

export const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

if (!__prod__) {
    client.on("error", (e) => console.error(e));
    client.on("warn", (e) => console.warn(e));
}

client.on("ready", () => {
    console.log("I am ready!");
    client.user?.setPresence({
        status: "online",
        activities: [{
            name: `${PREFIX}help`,
            type: "LISTENING"
        },
            {
                name: "donda",
                type: "LISTENING"
            }
        ]
    })
});

client.on("messageCreate", async (message) => {
    await handle(message);
});

client.on("interactionCreate", async interaction => {
    if (interaction.isSelectMenu() && interaction.customId === "help") {
        await interaction.reply({content: `<@${interaction.user.id}>`, embeds: [getHelpEmbed(interaction.values[0])]})
    }
})



