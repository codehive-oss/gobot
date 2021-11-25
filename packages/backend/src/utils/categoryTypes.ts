import { Field, ObjectType } from "type-graphql";

export const allCategories = ["economy", "misc", "level", "image", "moderation"] as const;
export type Categories = typeof allCategories[number];

export interface CategoryData {
  description: string;
}

export const allCategoryData: Record<Categories, CategoryData> = {
  economy: { description: "Economy based commands" },
  misc: { description: "Miscellanious Commands" },
  level: { description: "Level Commands" },
  image: { description: "Image Manupulation Commands" },
  moderation: {description: "Moderation Commands"},
};

@ObjectType()
export class Category implements CategoryData {
  @Field(() => String)
  name: Categories;

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
