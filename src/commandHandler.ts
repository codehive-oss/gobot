import { Message } from "discord.js";
import fs from "fs";
import { PREFIX } from "./constants";
import { Command } from "./types";

let commands: Command[] = [];

const commandFiles = fs
  .readdirSync("./dist/commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`) as Command;

  commands.push(command);
  console.log(`Registered ${command.name} command`);
}

export function handle(message: Message) {
  const content = message.content;
  if (content.startsWith(PREFIX)) {
    const commandName = content.split(" ")[0].substring(PREFIX.length);
    const args: string[] = [];
    content.split(" ").shift();
    for (const command of commands) {
      if (command.name === commandName) {
        command.execute(message, args);
      }
    }
  }
}
