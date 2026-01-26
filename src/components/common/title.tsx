'use client';

import { siteConfig } from '@/config/site.config';
import { usePathname } from 'next/navigation';

export default function Title() {
  const pathname = usePathname();
  const currentNavItem = siteConfig.navItems.find(
    (item) => item.href === pathname,
  );
  return (
    <div className="w-full flex justify-center mt-6 mb-12">
      <h1 className="text-3xl font-bold">
        {currentNavItem?.label ?? siteConfig.title}
      </h1>
    </div>
  );
}
