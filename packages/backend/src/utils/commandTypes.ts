import {
  ButtonInteraction,
  CacheType,
  Message,
  MessageComponentInteraction,
  SelectMenuInteraction,
} from "discord.js";
import { GoServer } from "@db/entities/GoServer";
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

  execute: (
    msg: Message,
    args: string[],
    server: GoServer
  ) => void | Promise<void>;

  constructor({
    name,
    description,
    aliases,
    usage,
    category,
    permissions,
    tags,
    execute,
  }: CommandSettings) {
    this.name = name;
    this.description = description;
    this.aliases = aliases;
    this.usage = usage;
    this.category = category;
    this.permissions = permissions;
    this.tags = tags;
    this.execute = execute;
  }
}

export interface CommandSettings {
  name: string;
  description: string;
  aliases?: string[];
  usage?: string;
  category?: Categories;
  permissions?: GuildPermissions;
  tags?: string[];
  execute: (
    msg: Message,
    args: string[],
    server: GoServer
  ) => void | Promise<void>;
}

export type CooldownCommandSettings = CommandSettings & { cooldown: number };

export class CooldownCommand extends Command {
  cooldown: number;

  constructor({
    name,
    description,
    aliases,
    usage,
    category,
    permissions,
    tags,
    cooldown,
    execute,
  }: CooldownCommandSettings) {
    super({
      name,
      description,
      aliases,
      usage,
      category,
      permissions,
      tags,
      execute,
    });
    this.cooldown = cooldown;
  }

  setCooldown = (
    commandName: string,
    userID: string,
    cooldown: number
  ): void => {
    cooldownMap.set(commandName + userID, new Date());
    setTimeout(() => cooldownMap.delete(commandName + userID), cooldown * 1000);
  };

  canExecute = (commandName: string, userID: string): boolean => {
    return !cooldownMap.has(commandName + userID);
  };

  getCooldown = (
    commandName: string,
    userID: string,
    cooldown: number
  ): number => {
    return Math.ceil(cooldown - this.getTimePassed(commandName, userID));
  };

  getTimePassed = (commandName: string, userID: string): number => {
    var lastUsed = cooldownMap.get(commandName + userID);

    if (!lastUsed) return -1;

    const delay = new Date().getTime() - lastUsed.getTime();
    return delay / 1000;
  };
}

// TODO: move this to redis
const cooldownMap = new Map<string, Date>();
