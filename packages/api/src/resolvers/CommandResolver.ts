import { commands, Command, Category, getAllCategories } from "@gobot/discord";
import { Query, Resolver, Arg } from "type-graphql";

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
    // TODO: Add proper names for categories
    return getAllCategories();
  }

  @Query(() => Command)
  async getCommandFromName(@Arg("commandName") commandName: string) {
    const result = commands.find((cmd) => cmd.name === commandName);

    if (result) {
      return result;
    } else {
      // TODO: Handle Error properly
      throw new Error("Command not found");
    }
  }
}
