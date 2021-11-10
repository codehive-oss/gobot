import { Arg, Mutation, Resolver } from "type-graphql";
// import { DiscordServer } from "../entities/DiscordServer";

@Resolver()
export class DiscordServerResolver {
  @Mutation(() => String)
  async setPrefix(
    // @Arg("serverID") serverID: string,
    @Arg("prefix") prefix: string
  ) {
    // DiscordServer.update({ id: serverID }, { prefix });
    return prefix;
  }
}
