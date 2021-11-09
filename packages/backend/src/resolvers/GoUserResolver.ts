import { GoUser } from "../entities/GoUser";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class GoUserResolver {
  @Query(() => GoUser)
  async getUser(@Arg("userID") id: string) {
    return await GoUser.findOne({ where: { id } });
  }

  @Mutation(() => GoUser)
  async createUser(@Arg("userID") id: string) {
    let goUser = await this.getUser(id);
    if (goUser) {
      return goUser;
    }

    goUser = GoUser.create({
      id: id,
      handBalance: 0,
      bankBalance: 0,
      // items: new Array(allItems.length).fill(0),
      // tools: new Array(tools.length).fill(0),
    });

    await goUser.save();
    return goUser;
  }

  
}
