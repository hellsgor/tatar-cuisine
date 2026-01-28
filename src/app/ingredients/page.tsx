import IngredientsTable from '@/components/features/ingredients/ingredients-table';
import IngredientsForm from '@/components/features/ingredients/ingredients.form';

export default function IngredientsPage() {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <IngredientsForm />
      <IngredientsTable />
    </div>
  );
}
