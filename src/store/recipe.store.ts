import { createRecipe, deleteRecipe, getRecipes, updateRecipe } from '@/actions/recipe';
import { Recipe } from '@/types/recipe';
import { create } from 'zustand';

interface ActionResult {
  success: boolean,
  recipe?: Recipe,
  error?: string,
}

interface RecipeState {
  recipes: Recipe[],
  isLoading: boolean,
  error: string | null,
  loadRecipes: () => Promise<void>,
  addRecipe: (formData: FormData) => Promise<ActionResult>;
  updateRecipe: (formData: FormData, id: string) => Promise<ActionResult>;
  removeRecipe: (id: string) => Promise<void>;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  isLoading: false,
  error: null,
  loadRecipes: async () => {
    set({ isLoading: true, error: null });

    try {
      const result = await getRecipes();

      if (result.success) {
        set({ recipes: result.recipes, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      console.error("error", error);
      set({ error: "Ошибка при загрузке рецептов", isLoading: false });
    }
  },
  addRecipe: async (formData: FormData) => {
    set({ error: null });

    try {
      const result = await createRecipe(formData);
      if (result.success) {
        set((state) => ({
          recipes: [...state.recipes, result.recipe!],
          isLoading: false
        }));
        return { success: true, recipe: result.recipe };
      } else {
        set({ error: result.error, isLoading: false });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("error", error);
      set({ error: "Ошибка при добавлении рецепта", isLoading: false });
      return { success: false, error: "Ошибка при добавлении рецепта" };
    }
  },
  updateRecipe: async (formData: FormData, id: string,) => {
    set({ error: null });

    try {
      const result = await updateRecipe(id, formData);
      if (result.success) {
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === id ? result.recipe! : recipe
          ),
          isLoading: false
        }));
        return { success: true, recipe: result.recipe };
      } else {
        set({ error: result.error, isLoading: false });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("error", error);
      set({ error: "Ошибка при обновлении рецепта", isLoading: false });
      return { success: false, error: "Ошибка при обновлении рецепта" };
    }
  },
  removeRecipe: async (id: string) => {
    set({ error: null });

    try {
      const result = await deleteRecipe(id);

      if (result.success) {
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== id),
          isLoading: false
        }));
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      console.error("error", error);
      set({ error: "Ошибка при удалении рецепта", isLoading: false });
    }
  }
}));
