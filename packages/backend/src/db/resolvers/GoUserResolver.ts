import logger from "../../utils/logger";
import { MyContext } from "../../utils/types";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import axios from "axios";
import { GoUser } from "../entities/GoUser";
import { isAuth } from "../middleware/isAuth";
import { DISCORD_API_ENDPOINT } from "../../utils/constants";
import { GuildData, UserData } from "../../utils/graphqlPayload";
import { isGuildAdmin } from "../../utils/apiGuildUtils";

@Resolver()
export class GoUserResolver {
  // Get all guilds where the user has permission to manage bots
  @Query(() => [GuildData])
  @UseMiddleware(isAuth)
  async getUserGuilds(@Ctx() { req }: MyContext) {
    const goUser = req.user as GoUser;

    if (!goUser.accessToken) {
      return new Error("User is not authenticated");
    }

    // Get user guilds from discord given a user id
    const profile = await axios.get(
      `${DISCORD_API_ENDPOINT}/users/@me/guilds`,
      {
        headers: { Authorization: `Bearer ${goUser.accessToken}` },
      }
    );

    // Filters all guilds where the user has the administrator permission and returns them
    const guilds: GuildData[] = profile.data.filter(isGuildAdmin);
    return guilds;
  }

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
