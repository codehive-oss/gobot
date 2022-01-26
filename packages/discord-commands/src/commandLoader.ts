import { logger } from "../utils/logger";
import { Command } from "../utils/Command";
import fs from "fs";
import { __prod__ } from "@gobot/environment";

export const commands: Command[] = [];

async function addCommandsRecursive(dir: string, folder: string) {
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
      await addCommandsRecursive(dir + "/" + file.toString(), file);
    }
    if (file.endsWith(".js")) {
      const command = (await import(`./commands/${folder}/${file}`))
        .default as Command | undefined;
      if (command?.name) {
        commands.push(command);
        logger.trace(`Registered ${command.name} command ${dir}/${file}`);
      } else {
        logger.warn(`Command in ${dir}/${file} is not a valid command`);
      }
    }
  }
}

addCommandsRecursive("./dist/commands", "");