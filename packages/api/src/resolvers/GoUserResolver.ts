import { logger } from "@gobot/logger";
import { MyContext } from "../utils/types";
import { Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import axios from "axios";
import { isAuth } from "../middleware/isAuth";
import { UserData } from "../utils/graphqlPayload";
import { DISCORD_API_ENDPOINT } from "@gobot/environment";
import { GoUser } from "@gobot/database";

@Resolver()
export class GoUserResolver {
  @Query(() => UserData)
  @UseMiddleware(isAuth)
  async me(@Ctx() { req }: MyContext) {
    const goUser = req.user as GoUser;
    const profile = await axios.get(`${DISCORD_API_ENDPOINT}/users/@me`, {
      headers: { Authorization: `Bearer ${goUser.accessToken}` },
    });

    return profile.data as UserData;
  }

  @Mutation(() => Boolean)
  logoutUser(@Ctx() { req }: MyContext) {
    try {
      req.logOut!();
    } catch (err) {
      logger.error(err);
      return false;
    }

    return true;
  }
}
