'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-8xl font-bold text-gray-300">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Страница не найдена</h1>
      <div className="pt-6">
        <Button as={Link} href="/" color="primary" variant="shadow">
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
}
