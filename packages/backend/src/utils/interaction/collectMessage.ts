import { Channel } from "@utils/types";
import { Message, User } from "discord.js";

export const collectMessage = ({
  channel,
  author,
  max,
  time
}: CollectMessageInput): Promise<Message> => {
  // collect messages
  const filter = (message: Message) => {
    return message.author.id === author.id;
  };

  const collector = channel.createMessageCollector({ filter, time, max});

  return new Promise<Message>((resolve) => {
    collector.on("collect", async (message) => {
      resolve(message);
    });
  });
};

export interface CollectMessageInput {
  channel: Channel;
  author: User;
  max?: number;
  time?: number;
}
