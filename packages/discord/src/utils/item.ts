export interface Item {
    name: string;
    description: string;
    price: number;
    dropRate: number;
    // image: string;
}

const coal = {
    name: "Coal",
    description: "A piece of coal.",
    price: 500,
    dropRate: 1 / 10,
};

const iron = {
    name: "Iron",
    description: "A piece of iron.",
    price: 1200,
    dropRate: 1 / 20,
};

const gold = {
    name: "Gold",
    description: "A piece of gold.",
    price: 7000,
    dropRate: 1 / 50,
};

const diamond = {
    name: "Diamond",
    description: "A piece of diamond.",
    price: 15000,
    dropRate: 1 / 100,
};

const ruby = {
    name: "Ruby",
    description: "A piece of ruby.",
    price: 50000,
    dropRate: 1 / 250,
};

const titanium = {
    name: "Titanium",
    description: "A piece of titanium.",
    price: 110000,
    dropRate: 1 / 1000,
};

const obamium = {
    name: "Obamium",
    description: "A piece of obamium.",
    price: 1000000,
    dropRate: 1 / 10000,
};

export const allItems: Item[] = [
    coal,
    iron,
    gold,
    diamond,
    ruby,
    titanium,
    obamium,
];
