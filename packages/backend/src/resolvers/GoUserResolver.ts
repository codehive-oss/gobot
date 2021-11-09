import { Query, Resolver } from "type-graphql";

@Resolver()
export class GoUserResolver {
  // Testing
  @Query(() => String)
  async hello() {
    return "Hello";
  }
}
