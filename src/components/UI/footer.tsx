import { layoutConfig } from '@/config/layout.config';
import { siteConfig } from '@/config/site.config';

export default function Footer() {
  return (
    <footer
      className={`flex  justify-center items-center`}
      style={{ height: layoutConfig.footerHeight }}
    >
      {siteConfig.description}
    </footer>
  );
}
