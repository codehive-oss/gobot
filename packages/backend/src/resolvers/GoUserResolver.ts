import { GoUser } from "../entities/GoUser";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class GoUserResolver {
  @Query(() => GoUser)
  async findUser(@Arg("userID") id: string) {
    return await GoUser.findOne({ where: { id } });
  }

  @Mutation(() => GoUser)
  async getUser(@Arg("userID") id: string) {
    let goUser = await this.findUser(id);
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

  @Mutation(() => Number)
  async decrementHandBalance(
    @Arg("userID") userID: string,
    @Arg("amount") amount: number
  ) {
    const user = await this.getUser(userID);

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
  }

  @Mutation()
  async incrementHandBalance(
    @Arg("userID") userID: string,
    @Arg("amount") amount: number
  ) {
    const user = await this.getUser(userID);
    user.handBalance = user.handBalance + amount;
    await user.save();
  }

  @Mutation(() => Number)
  async decrementBankBalance(
    @Arg("userID") userID: string,
    @Arg("amount") amount: number
  ) {
    const user = await this.getUser(userID);

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
  }

  @Mutation()
  async incrementBankBalance(
    @Arg("userID") userID: string,
    @Arg("amount") amount: number
  ) {
    const user = await this.getUser(userID);
    user.bankBalance = user.bankBalance + amount;
    await user.save();
  }

  @Mutation()
  async deposit(@Arg("userID") userID: string, @Arg("amount") amount: number) {
    const user = await this.getUser(userID);

    user.bankBalance += amount;
    user.handBalance -= amount;
    await user.save();
  }

  @Mutation()
  async withdraw(@Arg("userID") userID: string, @Arg("amount") amount: number) {
    await this.deposit(userID, -amount);
  }

  @Mutation()
  async addItem(@Arg("userID") userID: string, @Arg("item") item: number) {
    const user = await this.getUser(userID);

    user.items[item]++;
    console.log(user.items);
    await user.save();
  }

  @Mutation()
  async payUser(
    @Arg("userID") userID: string,
    @Arg("targetID") targetID: string,
    @Arg("amount") amount: number
  ) {
    let loss;
    loss = await this.decrementHandBalance(userID, amount);

    if (loss < amount) {
      loss += await this.decrementBankBalance(userID, amount - loss);
    }
    await this.incrementHandBalance(targetID, loss);

    return loss;
  }

  @Query()
  async hasTool(@Arg("userID") userID: string, @Arg("item") item: number) {
    const user = await this.getUser(userID);
    return user.tools[item] === 1;
  }

  @Mutation()
  async giveTool(@Arg("userID") userID: string, @Arg("item") item: number) {
    const user = await this.getUser(userID);
    user.tools[item] = 1;
    await user.save();
  }

  @Mutation()
  async removeTool(userID: string, id: number) {
    const user = await this.getUser(userID);
    user.tools[id] = 0;
    await user.save();
  }
}
