import { CommandSettings, Command } from "./Command";

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
