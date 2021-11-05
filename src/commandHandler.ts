import {Message} from "discord.js";
import fs from "fs";
import {PREFIX} from "./constants";

let commands: Map<string, any> = new Map()
const commandFiles = fs.readdirSync("./dist/commands").filter(file => file.endsWith(".js"))
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)

    commands.set(command.name, command)
    console.log(`Registered ${command.name} command`)
}

export function handle(message: Message) {
    const content = message.content;
    if(content.startsWith(PREFIX)) {
        const commandName = content.split(" ")[0].substring(1)
        const args : string[] = []
        content.split(" ").shift()
        for(const command of commands) {
            if(command[0] === commandName) {
                command[1].execute(message, args)
            }
        }
    }
}