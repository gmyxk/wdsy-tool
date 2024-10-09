import { BasicNavigationHeader } from '@/components';
import { BannerNotice } from '@/components/noice';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdProvider, Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '山有扶苏',
  description: '专注于某道手游的数据维护',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 不加 suppressHydrationWarning 时 NextThemesProvider 会导致警告
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AntdProvider>
            <BasicNavigationHeader />
            <div className="mx-auto max-w-7xl p-4">{children}</div>
            <BannerNotice />
          </AntdProvider>
        </Providers>
      </body>
    </html>
  );
}
