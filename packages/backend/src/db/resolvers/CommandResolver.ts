import { commands } from "@core/commandHandler";
import { Query, Resolver, Arg } from "type-graphql";
import { Command } from "@utils/commandTypes";
import { Category, getAllCategories } from "@utils/categoryTypes";
import { capitalizeFirstLetter } from "@utils/capitalize";

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
