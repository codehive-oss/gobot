import {Message, User} from "discord.js";
import exp from "constants";

export class Command {

  name: string;
  description: string;
<<<<<<< HEAD:src/types.ts
  aliases: string[];

  execute = (msg: Message, args: string[]): void => {
  };

}

export class cooldownCommand extends Command {
  cooldownMap : Map<string, number> = new Map()
  cooldown: number

  isOnCooldown = (user: User): boolean => {
    const lastUsed = this.cooldownMap.get(user.id) ? this.cooldownMap.get(user.id) : 0
    const delay = new Date().getTime() - lastUsed!
    return delay < this.cooldown * 1000;
  };

  getCooldown(user: User) : number {
    const lastUsed = this.cooldownMap.get(user.id) ? this.cooldownMap.get(user.id) : 0
    const delay = new Date().getTime() - lastUsed!
    return this.cooldown - Math.floor(delay/1000)
  }

  activateCooldown(user: User) : void {
    this.cooldownMap.set(user.id, new Date().getTime())
  }
=======
  aliases?: string[];
  execute(msg: Message, args: string[]): void;
>>>>>>> 9bb01032b2f9e6081e7604ae4c019a13446743e0:src/utils/types.ts
}
