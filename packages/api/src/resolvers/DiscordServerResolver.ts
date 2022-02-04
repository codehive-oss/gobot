import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { GoServer, toGoServer, GoUser } from "@gobot/database";
import { MyContext } from "../utils/types";
import { GuildData } from "../utils/graphqlPayload";
import { isAuth, isAdmin } from "../middleware/isAuth";
import { isGuildAdmin, getUserAdminGuild } from "../utils/apiGuildUtils";
import { logger } from "@gobot/logger";
import axios from "axios";
import { DISCORD_API_ENDPOINT } from "@gobot/environment";

@ObjectType()
class GuildDataPayload {
  @Field(() => GuildData)
  guildData: GuildData;
  @Field(() => GoServer)
  goServer: GoServer;
}

@InputType()
class UpdateServerInput {
  @Field()
  prefix: string;
  @Field()
  nsfw: boolean;
  @Field()
  anime: boolean;
}

@Resolver()
export class DiscordServerResolver {
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
        headers: {
          Authorization: `Bearer ${goUser.accessToken}`,
        },
      },
    );

    // Filters all guilds where the user has the administrator permission and returns them
    const guilds: GuildData[] = profile.data.filter(isGuildAdmin);
    return guilds;
  }

  @Query(() => GuildDataPayload)
  @UseMiddleware(isAuth)
  async getGuildDataPayloadFromID(
    @Ctx() { req }: MyContext,
    @Arg("serverID") serverID: string,
  ): Promise<GuildDataPayload> {
    const goUser = req.user as GoUser;
    const guildData = await getUserAdminGuild(serverID, goUser);
    if (!guildData) {
      throw new Error("You are not an admin of this server");
    }

    return {
      goServer: await toGoServer(serverID),
      guildData: guildData as GuildData,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isAdmin)
  async updateServer(
    @Arg("serverID") serverID: string,
    @Arg("updateServerInput") updateServerInput: UpdateServerInput,
  ): Promise<boolean> {
    try {
      await GoServer.update(serverID, updateServerInput);
      return true;
    } catch (err) {
      logger.error(err);
      return false;
    }
  }
}
