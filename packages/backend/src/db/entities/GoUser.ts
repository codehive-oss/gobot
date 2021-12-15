import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { allItems } from "../../utils/item";
import { tools } from "../../utils/tools";

// TODO: Clean up this huge mess
@Entity()
export class GoUser extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("int", { array: true, default: new Array(tools.length).fill(0) })
  items: number[];

  @Column("int", { array: true, default: new Array(allItems.length).fill(0) })
  tools: number[];

  @Column({ default: 0 })
  handBalance: number;

  @Column({ default: 0 })
  bankBalance: number;

  @Column({ default: 0 })
  xp: number;

  @Column({default: 0})
  messages: number

  @Column({ nullable: true })
  accessToken?: string;
}

export const getUser = async (userID: string): Promise<GoUser | undefined> => {
  return await GoUser.findOne({ where: { id: userID } });
};

export const createUser = async (userID: string) => {
  let goUser = await getUser(userID);
  if (goUser) {
    return goUser;
  }

  goUser = GoUser.create({
    id: userID,
  });

  await goUser.save();
  return goUser;
};

export const toGoUser = async (userID: string) => {
  const goUser = await getUser(userID);
  if (goUser) {
    return goUser;
  } else {
    return await createUser(userID);
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
  let loss;
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

export const addXp = async (user: GoUser, amount: number) => {
  user.xp += amount;
  await user.save();
};

export const increaseMessages = async (userid: string) => {
  const user = await getUser(userid)
  if(user) {
    user.messages+=1
    await user.save()
  }


}
