import { Message, MessageReaction, TextChannel, User } from "discord.js";
import { logger } from "../utils/logger";
import { Command } from "../utils/commandTypes/Command";
import { hasPermission } from "../utils/GuildPermissions";
import { GoServer } from "@db/entities/GoServer";
import { GoUser } from "@db/entities/GoUser";
import fs from "fs";
import { __prod__ } from "../utils/constants";
import { ReactionCommand } from "@utils/commandTypes/ReactionCommand";

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
      const command = (await import(`../commands/${folder}/${file}`))
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

export const handleMessage = async (message: Message, server: GoServer) => {
  if (message.webhookId) {
    return;
  }
  let content = message.content;

  // messages should not increment if they are commands
  if (message.member && !message.content.startsWith(server.prefix)) {
    const goUser = await GoUser.toGoUser(message.author.id);
    goUser.messages++;
    await goUser.save();
  }

  try {
    if (content.toLocaleLowerCase().startsWith(server.prefix)) {
      content = content.slice(server.prefix.length);
      const args = content.split(" ");
      const commandName = args[0].toLocaleLowerCase();
      args.shift();

      for (const command of commands) {
        if (
          command.name === commandName ||
          (command.aliases && command.aliases.includes(commandName))
        ) {
          if (command.permissions) {
            if (!hasPermission(message.member!, command.permissions)) {
              await message.reply("Insufficient Permissions");
              return;
            }
          }

          logger.trace(`Executing Command ${command.name} with args [${args}]`);
          await command.execute(message, args, server);
          return;
        }
      }
    }
  } catch (e) {
    logger.error(e);
    if (
      message.guild &&
      message.guild.me &&
      message.channel.type == "GUILD_TEXT"
    ) {
      if (
        message.guild.me
          .permissionsIn(message.channel as TextChannel)
          .has("SEND_MESSAGES")
      )
        message.reply(
          `An error occured while executing that command. Please contact the developer. Or try again later. Error: ${e.message}`
        );
    }
  }
};

export const handleReactionAdd = async (
  reaction: MessageReaction,
  user: User
) => {
  for (const command of commands) {
    // check if Command is of type ReactionCommand
    if(command instanceof ReactionCommand) {  
      command.reactionAdd(reaction, user);
    }
  }
};

export const handleReactionRemove = async (
  reaction: MessageReaction,
  user: User
) => {
    for (const command of commands) {
    // check if Command is of type ReactionCommand
    if(command instanceof ReactionCommand) {  
      command.reactionRemove(reaction, user);
    }
  }
};
