import { Message, User } from "discord.js";

export function getTarget(msg: Message): User {
  let target;
  if (msg.mentions.users.first()) {
    target = msg.mentions.users.first();
  } else {
    target = msg.author;
  }

  return target!;
}
