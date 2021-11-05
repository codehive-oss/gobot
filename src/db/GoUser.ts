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

export const getUser = async (user: User): Promise<GoUser | undefined> => {
  return await GoUser.findOne({ where: { id: user.id } });
};

export const createUser = async (user: User) => {
  let goUser = await getUser(user);
  if (goUser) {
    return goUser;
  }

  goUser = GoUser.create({
    id: user.id,
    balance: 0,
    item: [],
  });

  await goUser.save();
  return goUser;
};

export const upsert = async (user: User) => {
  const goUser = await getUser(user);
  if (goUser) {
    return goUser;
  } else {
    return await createUser(user);
  }
};
