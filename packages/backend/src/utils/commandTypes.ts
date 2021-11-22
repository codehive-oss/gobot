import {
  CacheType,
  Interaction,
  Message,
  SelectMenuInteraction,
} from "discord.js";
import { Field, ObjectType } from "type-graphql";
import { Categories } from "./categoryTypes";

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

  execute: (msg: Message, args: string[]) => void;
}

export interface Cooldown {
  cooldown: number;
}

export interface SelectMenu {
  handleInteraction: (interaction: SelectMenuInteraction<CacheType>) => void;
}

export const isSelectMenu = (
  command: Command
): command is Command & SelectMenu => {
  return (command as Command & SelectMenu).handleInteraction !== undefined;
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
