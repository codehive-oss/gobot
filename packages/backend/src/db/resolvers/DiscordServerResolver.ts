import axios from "axios";
import { MyContext } from "../../utils/types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { GoServer, toGoServer } from "../entities/GoServer";
import { isAuth } from "../middleware/isAuth";
import { GoUser } from "../entities/GoUser";
import { DISCORD_API_ENDPOINT } from "../../utils/constants";

// TODO: Check if user is allowed to look at this server
@Resolver()
export class DiscordServerResolver {
  @Query(() => GoServer)
  @UseMiddleware(isAuth)
  async getGuildFromID(
    @Ctx() { req }: MyContext,
    @Arg("serverID") serverID: string
  ): Promise<GoServer> {
    const goUser = req.user as GoUser;

    // TODO: Optimize this to only get one guild from user
    const res = await axios.get(`${DISCORD_API_ENDPOINT}/users/@me/guilds/`, {
      headers: { Authorization: `Bearer ${goUser.accessToken}` },
    });

    const servers = res.data as GoServer[];
    const server = servers.find((s) => s.id === serverID);

    if (!server) {
      throw new Error("Server not found");
    }

    return server;
  }

  @Mutation(() => GoServer)
  @UseMiddleware(isAuth)
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
  @UseMiddleware(isAuth)
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
  @UseMiddleware(isAuth)
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
