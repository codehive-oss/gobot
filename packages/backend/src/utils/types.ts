import {
  EmojiIdentifierResolvable,
  MessageButtonStyleResolvable,
} from "discord.js";
import { MessageButtonStyles } from "discord.js/typings/enums";
import { IncomingMessage, ServerResponse } from "http";

export type MyContext = {
  req: Partial<Express.Request> & IncomingMessage & { url: string };
  res: Express.Response &
    ServerResponse & { json?: ((data: unknown) => void) | undefined };
};
