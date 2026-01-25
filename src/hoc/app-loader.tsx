'use client';

import { useAuthStore } from '@/store/auth.store';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

interface AppLoaderProps {
  children: ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {
  const { data: session, status } = useSession();
  const { setAuthState } = useAuthStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]);
  return <div>{children}</div>;
}
