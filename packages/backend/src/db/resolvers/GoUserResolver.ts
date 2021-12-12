import { logger } from "../../utils/logger";
import { MyContext } from "../../utils/types";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import axios from "axios";
import { GoUser } from "../entities/GoUser";
import { isAuth } from "../middleware/isAuth";
import { DISCORD_API_ENDPOINT } from "../../utils/constants";
import { UserData } from "../../utils/graphqlPayload";

@Resolver()
export class GoUserResolver {
  @Query(() => UserData)
  @UseMiddleware(isAuth)
  async getUserData(@Ctx() { req }: MyContext) {
    const goUser = req.user as GoUser;
    const profile = await axios.get(`${DISCORD_API_ENDPOINT}/users/@me`, {
      headers: { Authorization: `Bearer ${goUser.accessToken}` },
    });

    return profile.data as UserData;
  }

  @Query(() => Boolean)
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
