import {Client, Intents} from "discord.js";
import {handle} from "./commandHandler";
import {__prod__} from "./constants";

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
            name: "go help",
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
    if (interaction.isSelectMenu()) {
        let resp: string
        switch (interaction.id) {
            case "1":
                resp = "Muckulus"
                break
            case "2":
                resp = "Mitona"
                break
            case "3":
                resp = "Sushi"
                break
            default:
                resp = "aaa"
                break
        }
        await interaction.reply({content: resp, ephemeral: true})
    }
})