import { ReactNode } from 'react';

interface AboutLayoutProps {
  children: ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <section>{children}</section>;
}
