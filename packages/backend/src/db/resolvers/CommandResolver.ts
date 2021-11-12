import { commands } from "../../utils/commandHandler";
import { Query, Resolver } from "type-graphql";
import { Command } from "../../utils/commandTypes";

@Resolver()
export class CommandResolver {
  @Query(() => [Command]) 
  async getCommands() {
    return commands;
  }
}