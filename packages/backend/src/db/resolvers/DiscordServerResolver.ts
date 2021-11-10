import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class DiscordServerResolver {
  @Mutation(() => String)
  async setPrefix(@Arg("prefix") prefix: string) {
    return prefix;
  }
}