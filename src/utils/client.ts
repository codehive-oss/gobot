import { Client, Intents } from "discord.js";
import { handle } from "./commandHandler";
import {__prod__, PREFIX} from "./constants";

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

if (!__prod__) {
  client.on("error", (e) => console.error(e));
  client.on("warn", (e) => console.warn(e));
}

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("messageCreate", async (message) => {
  await handle(message);
});

client.on("interactionCreate", async interaction => {
  if(interaction.isSelectMenu()) {
    let resp: string = ""
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