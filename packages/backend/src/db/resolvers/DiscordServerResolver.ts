import { MyContext } from "../../utils/types";
import {
  Arg,
  Ctx,
  Field,
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

@ObjectType()
class GuildDataPayload {
  @Field(() => GuildData)
  guildData: GuildData;
  @Field(() => GoServer)
  goServer: GoServer;
}

// TODO: Check if user is allowed to look at this server
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

  @Mutation(() => GoServer)
  @UseMiddleware(isAuth, isAdmin)
  async setPrefix(
    @Arg("serverID") serverID: string,
    @Arg("prefix") prefix: string
  ): Promise<GoServer> {
    const server = await toGoServer(serverID);
    server.prefix = prefix;
    await server.save();
    return server;
  }

  @Mutation(() => GoServer)
  @UseMiddleware(isAuth, isAdmin)
  async setAnime(
    @Arg("serverID") serverID: string,
    @Arg("anime") anime: boolean
  ): Promise<GoServer> {
    const server = await toGoServer(serverID);
    server.anime = anime;
    await server.save();
    return server;
  }

  @Mutation(() => GoServer)
  @UseMiddleware(isAuth, isAdmin)
  async setNSFW(
    @Arg("serverID") serverID: string,
    @Arg("nsfw") nsfw: boolean
  ): Promise<GoServer> {
    const server = await toGoServer(serverID);
    server.nsfw = nsfw;
    await server.save();
    return server;
  }
}
