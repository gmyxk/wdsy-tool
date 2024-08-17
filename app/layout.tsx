import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdProvider, Providers } from "./providers";
import dayjs from "dayjs";
import { BasicNavigationHeader } from "@/components";
import isLeapYear from "dayjs/plugin/isLeapYear";
import relativeTime from "dayjs/plugin/relativeTime";
import "./globals.css";
import "dayjs/locale/zh-cn";

dayjs.extend(isLeapYear);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

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
            {children}
          </AntdProvider>
        </Providers>
      </body>
    </html>
  );
}
