import {Arg, Mutation, Resolver} from "type-graphql";
import {GoServer, toGoServer} from "../entities/GoServer";


@Resolver()
export class DiscordServerResolver {

    @Mutation(() => GoServer)
    async setPrefix(
        @Arg("serverID") serverID: string,
        @Arg("prefix") prefix: string
    ): Promise<GoServer> {
        const server = await toGoServer(serverID)
        server.prefix = prefix
        await server.save({})
        return server
    }

    @Mutation(() => GoServer)
    async setAnime(
        @Arg("serverID") serverID: string,
        @Arg("anime") anime: boolean
    ): Promise<GoServer> {
        const server = await toGoServer(serverID)
        server.anime = anime
        await server.save({})
        return server
    }

    @Mutation(() => GoServer)
    async setNSFW(
        @Arg("serverID") serverID: string,
        @Arg("nsfw") nsfw: boolean
    ): Promise<GoServer> {
        const server = await toGoServer(serverID)
        server.nsfw = nsfw
        await server.save({})
        return server
    }

}

