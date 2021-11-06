import { Message, User } from "discord.js";

export class Command {
  name: string;
  description: string;
  aliases?: string[];

  execute: (msg: Message, args: string[]) => void;
}

export class CooldownCommand extends Command {
  execute: (msg: Message, args: string[]) => {};

  cooldownMap: Map<string, number> = new Map();
  cooldown: number;

  isOnCooldown = (user: User): boolean => {
    const lastUsed = this.cooldownMap.get(user.id)
      ? this.cooldownMap.get(user.id)
      : 0;
    const delay = new Date().getTime() - lastUsed!;
    return delay < this.cooldown * 1000;
  };

  getCooldown(user: User): number {
    const lastUsed = this.cooldownMap.get(user.id)
      ? this.cooldownMap.get(user.id)
      : 0;
    const delay = new Date().getTime() - lastUsed!;
    return this.cooldown - Math.floor(delay / 1000);
  }
}