import { commands } from "../../utils/commandHandler";
import { Query, Resolver, Arg } from "type-graphql";
import { Command } from "../../utils/commandTypes";
import { Category, getAllCategories } from "../../utils/categoryTypes";

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

  @Query(() => [Category])
  async getCategories() {
    return getAllCategories();
  }
}
