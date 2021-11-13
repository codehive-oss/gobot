import { IncomingMessage, ServerResponse } from "http";

export const allCategories = ["economy" ,"other" , "level",  "image"] as const;

// create string union type from allCategories
export type Categories = typeof allCategories[number];

export type MyContext = {
  req: Partial<Express.Request> & IncomingMessage & { url: string };
  res: Express.Response &
    ServerResponse & { json?: ((data: unknown) => void) | undefined };
};


