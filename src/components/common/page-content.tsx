'use client';

import { siteConfig } from '@/config/site.config';
import { usePathname } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

export default function PageContent() {
  const pathname = usePathname();
  const content =
    siteConfig.pagesContent[pathname as keyof typeof siteConfig.pagesContent]
      .content ?? siteConfig.errors.e001;

  const cleanHtml = DOMPurify.sanitize(content);
  return <div>{parse(cleanHtml)}</div>;
}
