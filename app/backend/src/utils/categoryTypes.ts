import { Field, ObjectType } from "type-graphql";

export const allCategories = [
  "economy",
  "misc",
  "level",
  "image",
  "moderation",
  "config",
  "minigames",
] as const;
export type Categories = typeof allCategories[number];

export interface CategoryData {
  displayName: string;
  description: string;
}

export const allCategoryData: Record<Categories, CategoryData> = {
  economy: {
    displayName: "Economy",
    description: "Use these commands to manage your in-game economy",
  },
  misc: {
    displayName: "Miscellanious",
    description: "Random fun commands to explore!",
  },
  level: {
    displayName: "Rank and Level",
    description: "Level Commands",
  },
  image: {
    displayName: "Image Manipulation",
    description: "Manipulate Images including the avatar of your friends",
  },
  moderation: {
    displayName: "Moderation",
    description: "Manage your server with our moderation commands",
  },
  config: {
    displayName: "Configuration",
    description: "Commands Used for Configuring GoBot for your server",
  },
  minigames: {
    displayName: "Mini Games",
    description: "Mini Games for real gamers",
  },
};

@ObjectType()
export class Category implements CategoryData {
  @Field(() => String)
  name: Categories;

  @Field(() => String)
  displayName: string;

  @Field(() => String)
  description: string;
}

// a method that returns allCategoryData as an array of Category
export const getAllCategories = () => {
  return Object.keys(allCategoryData).map((data) => {
    const category: Category = {
      name: data as Categories,
      ...allCategoryData[data as Categories],
    };

    return category;
  });
};
