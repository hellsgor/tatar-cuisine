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
