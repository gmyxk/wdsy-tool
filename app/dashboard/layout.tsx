'use client';

import { ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const TABS = [
  {
    href: '/dashboard/roles',
    title: '角色管理',
  },
  {
    href: '/dashboard/account',
    title: '账号管理',
  },
  {
    href: '/dashboard/server',
    title: '全服设置',
  },
];

export default function DashbordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="mt-[-16px]">
      <ScrollShadow
        hideScrollBar
        className="mb-4 flex w-full justify-between gap-8 border-b border-divider px-4 sm:px-8"
        orientation="horizontal"
      >
        <Tabs
          aria-label="Navigation Tabs"
          selectedKey={pathname}
          classNames={{
            tabList: 'w-full relative rounded-none p-0 gap-4 lg:gap-6',
            tab: 'max-w-fit px-0 h-12',
            cursor: 'w-full',
            tabContent: 'text-default-400',
          }}
          radius="full"
          variant="underlined"
        >
          {TABS.map((item) => (
            <Tab
              key={item.href}
              title={
                <Link key={item.href} href={item.href} className="block py-3">
                  {item.title}
                </Link>
              }
            />
          ))}
        </Tabs>
      </ScrollShadow>
      {children}
    </div>
  );
}
