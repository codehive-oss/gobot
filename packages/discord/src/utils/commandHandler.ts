import {Message} from "discord.js";
import fs from "fs";
import {PREFIX} from "./constants";
import {Command} from "./types";

export const commands: Command[] = [];


function addCommandsRecursive(dir: string, folder: string) {
    //recursion to scan directories inside "commands" too for better structure
    const commandFiles = fs
        .readdirSync(dir)
        .filter((file) => file.endsWith(".js") || fs.lstatSync(dir + "/" + file).isDirectory());
    for (const file of commandFiles) {
        if(fs.lstatSync(dir + "/" + file.toString()).isDirectory()) {
            console.log(file)
            addCommandsRecursive(dir + "/" +file.toString(), file)
        }
        if(file.endsWith(".js")) {
            const command = require(`../commands/${folder}/${file}`) as Command;
            commands.push(command);
            console.log(`Registered ${command.name} command ${dir}`);
        }



    }
}

addCommandsRecursive("./dist/commands", "")


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
