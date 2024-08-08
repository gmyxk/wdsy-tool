"use client";

import { NextUIProvider } from "@nextui-org/react";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider locale={zhCN}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </ConfigProvider>
  );
}
