import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import EditRecipeClient from './edit-recipe-client';

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) {
    redirect('/error?message=' + encodeURIComponent('Недостаточно прав'));
  }

  return <EditRecipeClient />;
}
