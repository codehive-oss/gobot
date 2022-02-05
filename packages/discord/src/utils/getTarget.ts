import { Message } from "discord.js";

export const getTargetUser = (msg: Message) => {
  let target = msg.mentions.users.first();

  if (!target) {
    target = msg.author;
  }

  return target;
};

export const getTargetMember = (msg: Message) => {
  let target = msg.mentions.members?.first();

  if (!target) {
    target = msg.member || undefined;
  }

  return target;
};
