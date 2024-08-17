import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdProvider, Providers } from "./providers";
import { BasicNavigationHeader } from "@/components";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "山有扶苏",
  description: "提供日常工作生活中所需的一些工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AntdProvider>
            <BasicNavigationHeader />
            <div className="max-w-5xl mx-auto p-4">{children}</div>
          </AntdProvider>
        </Providers>
      </body>
    </html>
  );
}
