import {Message} from "discord.js";
import fs from "fs";
import {PREFIX} from "./constants";
import {Command} from "./types";

export const commands: Command[] = [];

const commandFiles = fs
    .readdirSync("./dist/commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`../commands/${file}`) as Command;

    commands.push(command);
    console.log(`Registered ${command.name} command`);
}

export const handle = async (message: Message) => {
    let content = message.content;

    if (content.toLocaleLowerCase().startsWith(PREFIX)) {
        content = content.slice(PREFIX.length);
        const args = content.split(" ");
        const commandName = args[0];
        args.shift();
        for (const command of commands) {
            if (
                command.name === commandName ||
                (command.aliases && command.aliases.includes(commandName))
            ) {
                command.execute(message, args);
            }
        }
    }
};
