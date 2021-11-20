import axios from "axios";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { GoServer, toGoServer } from "../entities/GoServer";
import { isAuth } from "../middleware/isAuth";

// TODO: Check if user is allowed to look at this server
@Resolver()
export class DiscordServerResolver {
  @Query(() => GoServer)
  @UseMiddleware(isAuth)
  async getGuildFromID(@Arg("serverID") serverID: string): Promise<GoServer> {
    const res = await axios.get(
      `https://discordapp.com/api/guilds/${serverID}`
    );
    const server = res.data as GoServer;
    console.log("TEst");
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
