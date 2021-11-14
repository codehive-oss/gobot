import logger from "../../utils/logger";
import { MyContext } from "../../utils/types";
import { Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import axios from "axios";
import { GoUser } from "../entities/GoUser";

@ObjectType()
export class Guild {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  owner: boolean;
  @Field()
  permissions: number;
}

@Resolver()
export class GoUserResolver {
  @Query(() => [Guild])
  async getUserGuilds(@Ctx() { req }: MyContext) {
    if (!req.user) {
      return new Error("User is not authenticated");
    }

    const goUser = req.user as GoUser;

    if (!goUser.accessToken) {
      throw new Error("User is not authenticated");
    }

    // Get user guilds from discord given a user id
    const profile = await axios.get(
      `https://discordapp.com/api/users/@me/guilds`,
      {
        headers: { Authorization: `Bearer ${goUser.accessToken}` },
      }
    );

    const guilds = profile.data as Guild[];
    console.log(guilds);

    return guilds;
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
