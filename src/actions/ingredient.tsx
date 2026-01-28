'use server';

import { prisma } from '@/helpers/prisma';
import { ingredientSchema } from '@/schema/zod';
import { ZodError } from 'zod';

export async function createIngredient(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      unit: formData.get('unit') as string,
      pricePerUnit: formData.get('pricePerUnit')
        ? parseFloat(formData.get('pricePerUnit') as string)
        : null,
      description: formData.get('description') as string,
    };
    const validatedData = ingredientSchema.parse(data);

    const ingredient = await prisma.ingredient.create({
      data: {
        name: validatedData.name,
        category: validatedData.category,
        unit: validatedData.unit,
        pricePerUnit: validatedData.pricePerUnit,
        description: validatedData.description,
      },
    });

    return { success: true, ingredient };
  } catch (e) {
    if (e instanceof ZodError) {
      return { error: e.issues.map((issue) => issue.message).join(', ') };
    }

    const error = 'Ошибка создания ингредиента';
    console.error(e, error);
    return { error };
  }
}

export async function getIngredients() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return { success: true, ingredients };
  } catch (e) {
    const errorText = 'Ошибка при получении ингредиентов';
    console.log(errorText, e);
    return { error: errorText };
  }
}

export async function deleteIngredient(id: string) {
  try {
    const ingredient = await prisma.ingredient.delete({
      where: { id },
    });
    return { success: true, ingredient };
  } catch (e) {
    const errorText = 'Ошибка при удалении ингредиента';
    console.log(errorText, e);
    return { error: errorText };
  }
}
