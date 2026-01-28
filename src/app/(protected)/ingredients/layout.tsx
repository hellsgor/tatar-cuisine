import { ReactNode } from 'react';

interface IngredientsLayoutProps {
  children: ReactNode;
}

export default function IngredientsLayout({
  children,
}: IngredientsLayoutProps) {
  return <section>{children}</section>;
}
