import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { User } from "discord.js";

@Entity()
export class GoUser extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  item: number[];

  @Column()
  balance: number;
}

export async function exists(user: User) {
  return await GoUser.findOne({ where: { id: user.id } });
}

export async function create(user: User) {
  const newUser = GoUser.create({
    id: user.id,
    balance: 0,
    item: [],
  });

  return await newUser.save();
}

export const upsert = async (user: User) => {
  const goUser = await exists(user);
  if (goUser) {
    return goUser;
  } else {
    return await create(user);
  }
};
