import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class GuildData {
  @Field()
  id: string;
  @Field({ nullable: true })
  icon?: string;
  @Field()
  name: string;
}

@ObjectType()
export class UserData {
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  avatar: string;
}
