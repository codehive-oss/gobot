import { commands } from "../../utils/commandHandler";
import { Query, Resolver, Arg } from "type-graphql";
import { Command } from "../../utils/commandTypes";
import { allCategories } from "../../utils/types";

@Resolver()
export class CommandResolver {
  @Query(() => [Command])
  async getCommands() {
    return commands;
  }

  @Query(() => [Command])
  async getCategoryCommands(
    @Arg("category")
    category: string
  ) {
    return commands.filter((cmd) => cmd.category === category);
  }

  @Query(() => [String])
  async getCategories() {
    return allCategories;
  }
}
