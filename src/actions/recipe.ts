'use server';

import { prisma } from '@/helpers/prisma';
import { Recipe } from '@/types/recipe';
import { Ingredient } from '@/types/ingredient';

export async function getRecipes() {
  try {
    const recipesFromDb = await prisma.recipe.findMany({
      include: {
        recipeIngredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    const recipes = recipesFromDb.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      ingredients: recipe.recipeIngredients.map(ri => ({
        id: ri.id,
        ingredientId: ri.ingredientId,
        quantity: ri.quantity,
        ingredient: ri.ingredient,
      })),
    }));

    return { success: true, recipes };
  } catch (error) {
    const errorText = 'Ошибка при загрузке рецептов';
    console.log(errorText);
    return { success: false, error: errorText };
  }
}

export async function createRecipe(formData: FormData) {
  try {
    const { name,
      description,
      imageUrl,
      ingredients,
      error,
      success } = getRecipeData({ formData, error: 'Имя и хотя бы один ингредиент обязательны' });

    if (error && success === false) {
      return { error, success };
    }

    const recipe = await prisma.recipe.create({
      data: {
        name: name!,
        description: description!,
        imageUrl,
        recipeIngredients: {
          create: ingredients?.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        recipeIngredients: {
          include: {
            ingredient: true,
          },
        }
      },
    });

    return ({ success: true, recipe: toRecipe(recipe) });
  } catch (error) {
    const errorText = 'Ошибка при создании рецепта';
    console.log(errorText);
    return { success: false, error: errorText };
  }
}

export async function updateRecipe(id: string, formData: FormData) {
  try {
    const { name,
      description,
      imageUrl,
      ingredients,
      error,
      success } = getRecipeData({ formData, error: 'Имя и хотя бы один ингредиент обязательны' });

    if (error && success === false) {
      return { error, success };
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        recipeIngredients: {
          deleteMany: {},
          create: ingredients?.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId, } },
            quantity,
          }))
        },
      },
      include: {
        recipeIngredients: {
          include: {
            ingredient: true,
          },
        }
      },
    });

    return { success: true, recipe: toRecipe(recipe) };

  } catch (error) {
    const errorText = 'Ошибка при обновлении рецепта';
    console.log(errorText, error);
    return ({ success: false, error: errorText });
  }
}

export async function deleteRecipe(id: string) {
  try {
    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: id },
    });

    await prisma.recipe.delete({
      where: { id },
    });

    return ({ success: true });
  } catch (error) {
    const errorText = 'Ошибка при удалении рецепта';
    console.log(errorText, error);
    return ({ success: false, error: errorText });
  }
}

function toRecipe(recipe: {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  recipeIngredients: Array<{
    id: string;
    ingredientId: string;
    quantity: number;
    ingredient: Ingredient;
  }>;
}): Recipe {
  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    imageUrl: recipe.imageUrl,
    ingredients: recipe.recipeIngredients.map((ri) => ({
      id: ri.id,
      ingredientId: ri.ingredientId,
      quantity: ri.quantity,
      ingredient: ri.ingredient,
    })),
  };
}

const getRecipeData = ({ formData, error }: { formData: FormData, error: string; }) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string | null;
  const ingredients = Array.from(formData.entries())
    .filter(([key]) => key.startsWith('ingredient_'))
    .map(([key, value]) => ({
      ingredientId: value as string,
      quantity: parseFloat(
        formData.get(`quantity_${key.split('_')[1]}`) as string,
      ),
    }));

  if (!name || !ingredients.length) {
    return {
      success: false,
      error,
    };
  }

  return ({ name, description, imageUrl, ingredients });
};
