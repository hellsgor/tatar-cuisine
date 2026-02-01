import { Ingredient } from './ingredient';

export interface RecipeIngredient {
  id: string,
  ingredientId: string,
  quantity: number;
  ingredient: Ingredient,
}

export interface Recipe {
  id: string,
  name: string,
  description: string,
  imageUrl?: string | null,
  ingredients: RecipeIngredient[],
}
