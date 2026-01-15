'use client';

import { siteConfig } from '@/app/config/site.config';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Logo = () => {
  return (
    <Image
      src="/logo_tatar_kitchen.webp"
      alt={`${siteConfig.title} логотип`}
      height={26}
      width={26}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();

  const renderNavItems = () =>
    siteConfig.navItems.map(({ href, label }, i) => (
      <NavbarItem key={i}>
        <Link
          href={href}
          className={`px-3 py-1 rounded-md border-1 border-transparent  ${
            pathname === href ? 'text-blue-500' : 'text-foreground'
          } hover:text-blue-300 hover:border-blue-300 transition-colors transition-border duration-200`}
        >
          {label}
        </Link>
      </NavbarItem>
    ));

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="flex gap-1 items-center">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {renderNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Логин</Link>
        </NavbarItem>

        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
