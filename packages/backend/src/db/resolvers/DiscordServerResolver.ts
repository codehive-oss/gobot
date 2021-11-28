import { MyContext } from "../../utils/types";
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
import { GoServer, toGoServer } from "../entities/GoServer";
import { isAdmin, isAuth } from "../middleware/isAuth";
import { GoUser } from "../entities/GoUser";
import { getUserAdminGuild } from "../../utils/apiGuildUtils";
import { GuildData } from "../../utils/graphqlPayload";
import { logger } from "../../utils/logger";

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
  @Query(() => GuildDataPayload)
  @UseMiddleware(isAuth)
  async getGuildDataPayloadFromID(
    @Ctx() { req }: MyContext,
    @Arg("serverID") serverID: string
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
    @Arg("updateServerInput") updateServerInput: UpdateServerInput
  ): Promise<Boolean> {
    try {
      console.log(updateServerInput);
      await GoServer.update(serverID, updateServerInput);
      return true;
    } catch (err) {
      logger.error(err);
      return false;
    }
  }
}
