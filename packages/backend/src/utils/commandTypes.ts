import {
  ButtonInteraction,
  CacheType,
  Message,
  MessageComponentInteraction,
  SelectMenuInteraction,
} from "discord.js";
import { GoServer } from "../db/entities/GoServer";
import { Field, ObjectType } from "type-graphql";
import { Categories } from "./categoryTypes";
import { GuildPermissions } from "./GuildPermissions";

@ObjectType({ isAbstract: true })
export class Command {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  aliases?: string[];

  @Field({ nullable: true })
  usage?: string;

  @Field({ nullable: true })
  category?: Categories;

  permissions?: GuildPermissions;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  execute: (msg: Message, args: string[], server: GoServer) => void;
}

export interface Cooldown {
  cooldown: number;
}

export interface CommandSelectMenuInteraction {
  handleInteraction: (
    interaction: SelectMenuInteraction<CacheType>,
    server: GoServer
  ) => void;
}

export interface CommandButtonInteraction {
  handleInteraction: (
    interaction: ButtonInteraction<CacheType>,
    server: GoServer
  ) => void;
}

export interface MessageInteraction {
  handleInteraction: (
    interaction: MessageComponentInteraction<CacheType>,
    server: GoServer
  ) => void;
}

export const isInteractable = (
  command: Command
): command is Command & MessageInteraction => {
  return (
    (command as Command & MessageInteraction).handleInteraction !== undefined
  );
};

// TODO: move this to redis
const cooldownMap = new Map<string, Date>();

export const setCooldown = (
  commandName: string,
  userID: string,
  cooldown: number
): void => {
  cooldownMap.set(commandName + userID, new Date());
  setTimeout(() => cooldownMap.delete(commandName + userID), cooldown * 1000);
};

export const canExecute = (commandName: string, userID: string): boolean => {
  return !cooldownMap.has(commandName + userID);
};

export const getCooldown = (
  commandName: string,
  userID: string,
  cooldown: number
): number => {
  return Math.ceil(cooldown - getTimePassed(commandName, userID));
};

export const getTimePassed = (commandName: string, userID: string): number => {
  var lastUsed = cooldownMap.get(commandName + userID);

  if (!lastUsed) return -1;

  const delay = new Date().getTime() - lastUsed.getTime();
  return delay / 1000;
};
