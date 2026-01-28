import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import IngredientsTable from '@/components/features/ingredients/ingredients-table';
import IngredientsForm from '@/components/features/ingredients/ingredients.form';

export default async function IngredientsPage() {
  const session = await auth();
  if (!session) {
    redirect('/error?message=Недостаточно прав');
  }

  return (
    <div className="flex flex-col items-center gap-y-6">
      <IngredientsForm />
      <IngredientsTable />
    </div>
  );
}
