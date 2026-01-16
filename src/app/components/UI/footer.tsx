import { layoutConfig } from '@/app/config/layout.config';
import { siteConfig } from '@/app/config/site.config';

export default function Footer() {
  return (
    <footer
      className={`flex h-[${layoutConfig.footerHeight}] justify-center items-center`}
    >
      {siteConfig.description}
    </footer>
  );
}
