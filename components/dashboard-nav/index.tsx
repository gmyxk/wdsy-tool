'use client';

import { ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const DashbordNav = ({
  navs,
  pathnameLevel,
}: {
  navs: {
    href: string;
    title: React.ReactNode;
  }[];
  pathnameLevel?: number;
}) => {
  const pathname = usePathname();

  const currentPath = React.useMemo(() => {
    if (pathnameLevel === undefined) {
      return pathname;
    }

    return pathname
      .split('/')
      .slice(0, pathnameLevel + 1)
      .join('/');
  }, [pathname, pathnameLevel]);

  return (
    <ScrollShadow
      hideScrollBar
      className="mb-4 flex w-full justify-between gap-8 border-b border-divider px-4 sm:px-8"
      orientation="horizontal"
    >
      <Tabs
        aria-label="Navigation Tabs"
        selectedKey={currentPath}
        classNames={{
          tabList: 'w-full relative rounded-none p-0 gap-4 lg:gap-6',
          tab: 'max-w-fit px-0 h-12',
          cursor: 'w-full',
          tabContent: 'text-default-400',
        }}
        radius="full"
        variant="underlined"
      >
        {navs.map((item) => (
          <Tab key={item.href} as={Link} href={item.href} title={item.title} />
        ))}
      </Tabs>
    </ScrollShadow>
  );
};
