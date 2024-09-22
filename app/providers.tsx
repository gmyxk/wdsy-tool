'use client';

import { getQueryClient } from '@/app/get-query-client';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, theme as themeAntd } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/ReactToastify.min.css';

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
          theme === 'dark'
            ? themeAntd.darkAlgorithm
            : themeAntd.defaultAlgorithm,
      }}
    >
      {children}
      <ToastContainer
        theme={theme}
        autoClose={2000}
        // position="top-right"
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // transition: Bounce,
      />
      <ProgressBar
        height="4px"
        color="#006fee"
        options={{ showSpinner: true }}
        // shallowRouting
      />
    </ConfigProvider>
  );
}
