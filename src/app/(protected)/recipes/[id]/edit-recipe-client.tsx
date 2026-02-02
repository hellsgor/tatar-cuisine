'use client';

import RecipeForm from '@/components/features/recipe/recipe.form';
import { useRecipeStore } from '@/store/recipe.store';
import { Recipe } from '@/types/recipe';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditRecipeClient() {
  const { id } = useParams<{ id: string }>();
  const { recipes, isLoading, error } = useRecipeStore();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (recipes.length > 0 || error) {
      const foundRecipe = recipes.find((r) => r.id === id);
      setRecipe(foundRecipe || null);
      setHasSearched(true);
    }
  }, [recipes, id, error]);

  if (isLoading) return <p className="text-centers">Загрузка...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (hasSearched && !recipe)
    return <p className="text-red-500 text-center">Рецепт не найден</p>;

  if (recipe) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">
          {`Редактировать рецепт ${recipe.name}`}
        </h1>
        <RecipeForm initialRecipe={recipe} />
      </div>
    );
  }

  return <p className="text-center">Загрузка...</p>;
}
