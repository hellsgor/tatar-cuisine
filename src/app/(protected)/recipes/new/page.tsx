import { auth } from '@/auth/auth';
import RecipeForm from '@/components/features/recipe/recipe.form';
import { redirect } from 'next/navigation';

export default async function NewRecipePage() {
  const session = await auth();
  if (!session) {
    redirect('/error?message=' + encodeURIComponent('Недостаточно прав'));
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Создать новый рецепт</h1>
      <RecipeForm />
    </div>
  );
}
