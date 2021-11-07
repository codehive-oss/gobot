import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { User } from "discord.js";
import { allItems } from "../../utils/item";

@Entity()
export class GoUser extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("int", { array: true })
  items: number[];

  @Column()
  handBalance: number;

  @Column()
  bankBalance: number;
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
    handBalance: 0,
    bankBalance: 0,
    items: new Array(allItems.length).fill(0),
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

export const decrementHandBalance = async (dcuser: User, amount: number) => {
  const user = await upsert(dcuser);
  let lost: number = 0;
  if (amount > user.handBalance) {
    //to prevent balance from going below 0
    lost = user.handBalance;
    user.handBalance = 0;
  } else {
    lost = amount;
    user.handBalance = user.handBalance - amount;
  }

  await user.save();
  return lost;
};

export const incrementHandBalance = async (dcuser: User, amount: number) => {
  const user = await upsert(dcuser);
  user.handBalance = user.handBalance + amount;
  await user.save();
};

export const deposit = async (user: GoUser, amount: number) => {
  user.bankBalance += amount;
  user.handBalance -= amount;
  await user.save();
};

export const withdraw = async (user: GoUser, amount: number) => {
  user.bankBalance -= amount;
  user.handBalance += amount;
  await user.save();
};

export const addItem = async (dcuser: User, item: number) => {
  const user = await upsert(dcuser);
  user.items[item]++;
  console.log(user.items);
  await user.save();
};
