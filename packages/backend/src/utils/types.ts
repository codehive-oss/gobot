import { IncomingMessage, ServerResponse } from "http";

export type categories = "economy" | "other" | "level" | "image";

export type MyContext = {
  req: Partial<Express.Request> & IncomingMessage & { url: string };
  res: Express.Response &
    ServerResponse & { json?: ((data: unknown) => void) | undefined };
};


