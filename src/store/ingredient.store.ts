import {
  createIngredient,
  deleteIngredient,
  getIngredients,
} from '@/actions/ingredient';
import { Ingredient } from '@/types/ingredient';
import { create } from 'zustand';

interface IngredientState {
  ingredients: Ingredient[];
  isLoading: boolean;
  error: string | null;
  loadIngredients: () => Promise<void>;
  addIngredient: (formData: FormData) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;
}

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [],
  isLoading: false,
  error: null,
  loadIngredients: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await getIngredients();
      if (result.success) {
        set({ ingredients: result.ingredients, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (e) {
      const errorText = 'Ошибка при получении ингредиентов';
      console.log(errorText, e);
      set({ error: errorText, isLoading: false });
    }
  },
  addIngredient: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createIngredient(formData);
      if (result.success) {
        set((state) => ({
          isLoading: false,
          ingredients: [...state.ingredients, result.ingredient],
        }));
      } else {
        set({ isLoading: false, error: result.error });
      }
    } catch (e) {
      const errorText = 'Ошибка при добавлении ингредиента';
      console.log(errorText, e);
      set({ isLoading: false, error: errorText });
    }
  },
  removeIngredient: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const result = await deleteIngredient(id);

      if (result.success) {
        set((state) => ({
          isLoading: false,
          ingredients: state.ingredients.filter((ing) => ing.id !== id),
        }));
      } else {
        set({ isLoading: false, error: result.error });
      }
    } catch (e) {
      const errorText = 'Ошибка при удалении ингредиента';
      console.log(errorText);
      set({ error: errorText, isLoading: false });
    }
  },
}));
