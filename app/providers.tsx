"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/app/get-query-client";
import { NextUIProvider } from "@nextui-org/react";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider, theme as themeAntd } from "antd";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export function AntdProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm:
          theme === "dark"
            ? themeAntd.darkAlgorithm
            : themeAntd.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
