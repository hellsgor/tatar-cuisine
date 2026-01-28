'use client';

import { useAuthStore } from '@/store/auth.store';
import { useIngredientStore } from '@/store/ingredient.store';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

interface AppLoaderProps {
  children: ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {
  const { data: session, status } = useSession();
  const { isAuth, setAuthState } = useAuthStore();
  const { loadIngredients } = useIngredientStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]);

  useEffect(() => {
    if (isAuth) {
      loadIngredients();
    }
  }, [isAuth, loadIngredients]);

  return <div>{children}</div>;
}
