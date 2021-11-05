import { Client, Intents } from "discord.js";
import { TOKEN, __prod__ } from "./constants";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

if (!__prod__) {
  client.on("error", (e) => console.error(e));
  client.on("warn", (e) => console.warn(e));
}

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});

client.login(TOKEN);