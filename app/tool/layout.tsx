'use client';

import { ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  {
    href: '/tool/checksum',
    title: 'Checksum 计算',
  },
  {
    href: '/tool/lpc',
    title: 'LPC 对象格式化',
  },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
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
