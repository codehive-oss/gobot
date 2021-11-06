import { Message } from "discord.js";

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute(msg: Message, args: string[]): void;
}
