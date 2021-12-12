import { MyContext } from "../../utils/types";
import { MiddlewareFn } from "type-graphql";
import { checkUserAdminGuild } from "../../utils/apiGuildUtils";
import { GoUser } from "../entities/GoUser";

// TODO: Handle Errors in a better way
export const isAuth: MiddlewareFn<MyContext> = ({ context: { req } }, next) => {
  if (!req.user) {
    throw new Error("User not authenticated");
  }

  return next();
};

export const isAdmin: MiddlewareFn<MyContext> = async (
  { context: { req }, args: { serverID } },
  next
) => {
  const goUser = req.user as GoUser;
  const isAdmin = await checkUserAdminGuild(serverID, goUser);
  if (!isAdmin) {
    throw new Error("User not authenticated");
  }

  return next();
};
