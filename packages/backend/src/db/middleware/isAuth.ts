import { MyContext } from "../../utils/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.user) {
    throw new Error("User not authenticated");
  }

  return next();
};