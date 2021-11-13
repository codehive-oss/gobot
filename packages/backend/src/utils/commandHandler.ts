import { Message } from "discord.js";
import fs from "fs";
import logger from "./logger";
import { Command } from "./commandTypes";

export const commands: Command[] = [];

function addCommandsRecursive(dir: string, folder: string) {
  //recursion to scan directories inside "commands" too for better structure
  const commandFiles = fs
    .readdirSync(dir)
    .filter(
      (file) =>
        file.endsWith(".js") || fs.lstatSync(dir + "/" + file).isDirectory()
    ); // only files that end with .js or folders
  for (const file of commandFiles) {
    if (fs.lstatSync(dir + "/" + file.toString()).isDirectory()) {
      logger.info(`Registering category ${file}`);
      addCommandsRecursive(dir + "/" + file.toString(), file);
    }
    if (file.endsWith(".js")) {
      const command = require(`../commands/${folder}/${file}`) as Command;
      commands.push(command);
      logger.trace(`Registered ${command.name} command ${dir}`);
    }
  }
}

addCommandsRecursive("./dist/commands", "");

export const handle = async (message: Message, prefix: string) => {
  if (message.webhookId) {
    return;
  }
  let content = message.content;

  if (content.toLocaleLowerCase().startsWith(prefix)) {
    content = content.slice(prefix.length);
    const args = content.split(" ");
    const commandName = args[0];
    args.shift();
    for (const command of commands) {
      if (
        command.name === commandName ||
        (command.aliases && command.aliases.includes(commandName))
      ) {
        logger.trace(`Executing Command ${command.name} with args [${args}]`);
        command.execute(message, args);
      }
    }
  }
};
