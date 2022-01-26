import { Message } from "discord.js";
import { GoServer } from "@db/entities/GoServer";
import { Field, ObjectType } from "type-graphql";
import { Categories } from "../categoryTypes";
import { GuildPermissions } from "../GuildPermissions";

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

  @Field(() => [String], { nullable: true })
  examples?: string[];

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
    examples,
    execute,
  }: CommandSettings) {
    this.name = name;
    this.description = description;
    this.aliases = aliases;
    this.usage = usage;
    this.category = category;
    this.permissions = permissions;
    this.tags = tags;
    this.examples = examples;
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
  examples?: string[];
  execute: (
    msg: Message,
    args: string[],
    server: GoServer
  ) => void | Promise<void>;
}
