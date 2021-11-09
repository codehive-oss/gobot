import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class GoUser extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column("int", { array: true })
  items: number[];

  @Field()
  @Column("int", { array: true })
  tools: number[];

  @Field()
  @Column()
  handBalance: number;

  @Field()
  @Column()
  bankBalance: number;
}
