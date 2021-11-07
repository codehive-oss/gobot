import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { User } from "discord.js";
import { allItems } from "../../utils/item";
import { tools } from "../../utils/tools";

@Entity()
export class GoUser extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("int", { array: true })
  items: number[];

  @Column("int", { array: true })
  tools: number[];

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
    tools: new Array(tools.length).fill(0),
  });

  await goUser.save();
  return goUser;
};

export const toGoUser = async (user: User) => {
  const goUser = await getUser(user);
  if (goUser) {
    return goUser;
  } else {
    return await createUser(user);
  }
};

export const decrementHandBalance = async (user: GoUser, amount: number) => {
  let lost: number;
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

export const incrementHandBalance = async (user: GoUser, amount: number) => {
  user.handBalance = user.handBalance + amount;
  await user.save();
};

export const decrementBankBalance = async (user: GoUser, amount: number) => {
  let lost: number;
  if (amount > user.bankBalance) {
    // to prevent bank balance from going below 0
    lost = user.bankBalance;
    user.bankBalance = 0;
  } else {
    lost = amount;
    user.bankBalance = user.bankBalance - amount;
  }

  await user.save();
  return lost;
};

export const incrementBankBalance = async (user: GoUser, amount: number) => {
  user.bankBalance = user.bankBalance + amount;
  await user.save();
};

export const deposit = async (user: GoUser, amount: number) => {
  user.bankBalance += amount;
  user.handBalance -= amount;
  await user.save();
};

export const withdraw = async (user: GoUser, amount: number) => {
  await deposit(user, -amount);
};

export const addItem = async (user: GoUser, item: number) => {
  user.items[item]++;
  console.log(user.items);
  await user.save();
};

export const payUser = async (user: GoUser, target: GoUser, amount: number) => {
  let loss
  loss = await decrementHandBalance(user, amount);
  if (loss < amount) {
    loss += await decrementBankBalance(user, amount - loss);
  }
  await incrementHandBalance(target, loss);

  return loss;
};

export const hasTool = async (user: GoUser, id: number) => {
  return user.tools[id] === 1;
};

export const giveTool = async (user: GoUser, id: number) => {
  user.tools[id] = 1;
  await user.save();
};

export const removeTool = async (user: GoUser, id: number) => {
  user.tools[id] = 0;
  await user.save();
};
