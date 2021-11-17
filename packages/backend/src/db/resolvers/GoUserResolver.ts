import logger from "../../utils/logger";
import { MyContext } from "../../utils/types";
import {
  Ctx,
  Field,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import axios from "axios";
import { GoUser } from "../entities/GoUser";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
export class Guild {
  @Field()
  id: string;
  @Field({ nullable: true })
  icon?: string;
  @Field()
  name: string;
  @Field()
  owner: boolean;
  @Field()
  permissions: number;
}

@ObjectType()
export class UserData {
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  avatar: string;
}

@Resolver()
export class GoUserResolver {
  // Get all guilds where the user has permission to manage bots
  @Query(() => [Guild])
  @UseMiddleware(isAuth)
  async getUserGuilds(@Ctx() { req }: MyContext) {
    const goUser = req.user as GoUser;

    if (!goUser.accessToken) {
      return new Error("User is not authenticated");
    }

    // Get user guilds from discord given a user id
    const profile = await axios.get(
      `https://discordapp.com/api/users/@me/guilds`,
      {
        headers: { Authorization: `Bearer ${goUser.accessToken}` },
      }
    );

    // Filters all guilds where the user has the manage_guild permission and returns them
    const guilds = profile.data.filter((guild: Guild) => guild.permissions & 8);
    return guilds;
  }

  @Query(() => UserData)
  @UseMiddleware(isAuth)
  async getUserData(@Ctx() { req }: MyContext) {
    const goUser = req.user as GoUser;
    const profile = await axios.get("https://discordapp.com/api/users/@me", {
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
