export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  dropRate: number;
  // image: string;
}

export const coal: Item = {
  id: 0,
  name: "Coal",
  description: "A piece of coal.",
  price: 500,
  dropRate: 1 / 10,
};

export const iron: Item = {
  id: 1,
  name: "Iron",
  description: "A piece of iron.",
  price: 1200,
  dropRate: 1 / 20,
};

export const gold: Item = {
  id: 2,
  name: "Gold",
  description: "A piece of gold.",
  price: 7000,
  dropRate: 1 / 50,
};

export const diamond: Item = {
  id: 3,
  name: "Diamond",
  description: "A piece of diamond.",
  price: 15000,
  dropRate: 1 / 100,
};

export const ruby: Item = {
  id: 4,
  name: "Ruby",
  description: "A piece of ruby.",
  price: 50000,
  dropRate: 1 / 250,
};

export const titanium: Item = {
  id: 5,
  name: "Titanium",
  description: "A piece of titanium.",
  price: 110000,
  dropRate: 1 / 1000,
};

export const obamium: Item = {
  id: 6,
  name: "Obamium",
  description: "A piece of obamium.",
  price: 1000000,
  dropRate: 1 / 10000,
};

export const allItems = [coal, iron, gold, diamond, ruby, titanium, obamium];
