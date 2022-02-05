import { MessageReaction, User } from "discord.js";
import { Command, CommandSettings } from "./Command";

export type ReactionCommandSettings = CommandSettings & {
  reactionAdd: (reaction: MessageReaction, user: User) => void | Promise<void>;
  reactionRemove: (
    reaction: MessageReaction,
    user: User,
  ) => void | Promise<void>;
};

export class ReactionCommand extends Command {
  constructor({
    name,
    description,
    aliases,
    usage,
    category,
    permissions,
    tags,
    execute,
    reactionAdd,
    reactionRemove,
  }: ReactionCommandSettings) {
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
    this.reactionAdd = reactionAdd;
    this.reactionRemove = reactionRemove;
  }

  reactionAdd: (reaction: MessageReaction, user: User) => void | Promise<void>;
  reactionRemove: (
    reaction: MessageReaction,
    user: User,
  ) => void | Promise<void>;
}
