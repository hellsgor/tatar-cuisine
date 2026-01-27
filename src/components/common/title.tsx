'use client';

import { siteConfig } from '@/config/site.config';
import { usePathname } from 'next/navigation';

export default function Title() {
  const pathname = usePathname();
  const currentNavItem = siteConfig.navItems.find(
    (item) => item.href === pathname,
  );
  return (
    <h1 className="text-3xl font-bold text-center my-6">
      {currentNavItem?.label ?? siteConfig.title}
    </h1>
  );
}
