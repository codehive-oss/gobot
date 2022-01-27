import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { allItems } from "../utils/item";
import { allTools } from "../utils/tools";

@Entity()
export class GoUser extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ default: 0 })
  handBalance: number;

  @Column({ default: 0 })
  bankBalance: number;

  @Column({ default: 0 })
  xp: number;

  @Column({ default: 0 })
  messages: number;

  // Items
  @Column("int", { array: true, default: new Array(allItems.length).fill(0) })
  items: number[];

  // Tools
  @Column("int", { array: true, default: new Array(allTools.length).fill(0) })
  tools: number[];

  public static async toGoUser(userID: string): Promise<GoUser> {
    let goUser = await GoUser.findOne({ where: { id: userID } });
    if (goUser) {
      return goUser;
    }

    goUser = GoUser.create({
      id: userID,
    });

    await goUser.save();
    return goUser;
  }

  decrementHandBalance = (amount: number) => {
    let lost: number;
    if (amount > this.handBalance) {
      //to prevent balance from going below 0
      lost = this.handBalance;
      this.handBalance = 0;
    } else {
      lost = amount;
      this.handBalance = this.handBalance - amount;
    }

    return lost;
  };

  incrementHandBalance = (amount: number) => {
    this.handBalance = this.handBalance + amount;
  };

  decrementBankBalance = (amount: number) => {
    let lost: number;
    if (amount > this.bankBalance) {
      // to prevent bank balance from going below 0
      lost = this.bankBalance;
      this.bankBalance = 0;
    } else {
      lost = amount;
      this.bankBalance = this.bankBalance - amount;
    }

    return lost;
  };

  incrementBankBalance = (amount: number) => {
    this.bankBalance = this.bankBalance + amount;
  };

  deposit = (amount: number) => {
    this.bankBalance += amount;
    this.handBalance -= amount;
  };

  withdraw = (amount: number) => {
    this.deposit(-amount);
  };

  addItem = (item: number) => {
    this.items[item]++;
  };

  payUser = (target: GoUser, amount: number) => {
    let loss;
    loss = this.decrementHandBalance(amount);
    if (loss < amount) {
      loss += this.decrementBankBalance(amount - loss);
    }
    target.incrementHandBalance(loss);

    return loss;
  };

  hasTool = (id: number) => {
    return this.tools[id] > 0;
  };

  upgradeTool = (id: number) => {
    this.tools[id]++;
  };

  getToolLevel = (id: number) => {
    return this.tools[id];
  };

  addXp = (amount: number) => {
    this.xp += amount;
  };
}
