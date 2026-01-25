import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/providers';
import Header from '@/components/UI/header';
import { layoutConfig } from '@/config/layout.config';
import Footer from '@/components/UI/footer';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth';
import AppLoader from '@/hoc/app-loader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              <main
                className={`flex flex-col w-full justify-start items-center`}
                style={{
                  minHeight: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`,
                }}
              >
                {children}
              </main>
              <Footer />
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
