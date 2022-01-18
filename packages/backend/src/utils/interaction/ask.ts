import { Message } from "discord.js";
import { collectMessage } from "./collectMessage";

export const ask = async (question: string, commandMessage: Message) => {
  await commandMessage.reply(question);

  const message = await collectMessage({
    channel: commandMessage.channel,
    author: commandMessage.author,
    max: 1,
  });

  return message.content;
};

export const askChannel = async (question: string, commandMessage: Message) => {
  const message = await ask(question, commandMessage);

  // extract the channel name from message with regex
  const channelName = message.match(/<#(\d+)>/);
  if (!channelName) {
    commandMessage.reply("Invalid channel name");
    return;
  }

  const channel = commandMessage.guild?.channels.cache.get(channelName[1]);

  if (!channel) {
    commandMessage.reply("This channel does not exist.");
    return;
  }

  if (!channel.isText()) {
    commandMessage.reply("This channel is not a text channel.");
    return;
  }

  return channel;
};

export const askRole = async (question: string, commandMessage: Message) => {
  const message = await ask(question, commandMessage);

  // extract the role name from message with regex
  const roleName = message.match(/<@&(\d+)>/);
  if (!roleName) {
    commandMessage.reply("Invalid role name");
    return;
  }

  const role = commandMessage.guild?.roles.cache.get(roleName[1]);

  if (!role) {
    commandMessage.reply("This role does not exist.");
    return;
  }

  return role;
};

export const askTextChannel = async (
  question: string,
  commandMessage: Message
) => {
  const channel = await askChannel(question, commandMessage);

  if (!channel) {
    return;
  }

  if (!channel.isText()) {
    commandMessage.reply("This channel is not a text channel.");
    return;
  }

  return channel;
};
