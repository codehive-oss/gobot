import { randomInt } from "crypto";

export interface Tool {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const pickaxe = {
  id: 0,
  name: "Pickaxe",
  description: "Used to mine ores",
  price: 0,
};

export const allTools: Tool[] = [pickaxe];

// Calculates cost based of price and level of tool
export const calculateUpgradeCost = (price: number, level: number) => {
  return Math.pow(level, 2) * (price + level * 100);
};

export const calculateMineAmount = (level: number) => {
  let amount = randomInt(300, 500);
  // Level Bonus
  amount += amount * (level / 5);

  return amount;
};
