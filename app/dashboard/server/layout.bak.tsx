'use client';

import { Sidebar } from '@/components/sidebar';
import { SidebarDrawer } from '@/components/sidebar-drawer';
import { cn } from '@/utils';
import { Icon } from '@iconify/react';
import { Button, Divider, useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const isCollapsed = false;

const configs = [
  {
    label: '全服邮件发放',
    href: '/dashboard/server/global-mail',
  },
  {
    label: '统一道行',
    href: '/dashboard/server/daoheng',
  },
  {
    label: '统一武学',
    href: '/dashboard/server/wuxue',
    disable: true,
  },
  {
    label: '日志清理',
    href: '/dashboard/server/log',
    disable: true,
  },
  {
    label: '排行榜',
    href: '/dashboard/server/rank',
    disable: true,
  },
  {
    label: '服务器时间',
    href: '/dashboard/server/servertime',
    disable: true,
  },
  {
    label: '上线邮件',
    href: '/dashboard/server/online-mail',
    disable: true,
  },
];

export default function ServerSetingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex min-h-60 gap-4">
      <div>
        <SidebarDrawer
          className={cn('min-w-[160px] overflow-y-auto rounded-lg', {
            'min-w-[76px]': isCollapsed,
          })}
          sidebarWidth={160}
          hideCloseButton={true}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <div
            className={cn(
              'will-change relative flex h-full w-40 flex-col overflow-auto transition-width',
              {
                'w-[83px] items-center px-[6px] py-6': isCollapsed,
              }
            )}
          >
            <Sidebar
              defaultSelectedKey="chat"
              iconClassName="group-data-[selected=true]:text-default-50"
              isCompact={isCollapsed}
              itemClasses={{
                base: 'px-3 rounded-large data-[selected=true]:!bg-foreground',
                title: 'group-data-[selected=true]:text-default-50',
              }}
              selectedKeys={[pathname]}
              disabledKeys={configs
                .filter((config) => config.disable)
                .map((config) => config.href)}
              items={configs.map(({ href, label }) => {
                return {
                  key: href,
                  title: label,
                  href,
                  as: Link,
                };
              })}
            />
          </div>
        </SidebarDrawer>
      </div>
      <div className="hidden md:block">
        <Divider orientation="vertical" />
      </div>

      <div className="flex-grow">
        <header
          className={cn(
            'flex w-full items-center justify-between gap-2 border-b border-divider pb-2'
          )}
        >
          <Button
            isIconOnly
            className={cn('flex text-default-500')}
            size="sm"
            variant="light"
            onPress={() => {
              onOpenChange();
            }}
          >
            <Icon height={24} icon="solar:hamburger-menu-outline" width={24} />
          </Button>

          <div
            className={cn(
              'ml-[-32px] flex w-full items-center justify-center text-large font-bold text-foreground lg:justify-start'
            )}
          >
            <h5 className="font-bold text-lg text-foreground">
              {configs.find((config) => config.href === pathname)?.label}
            </h5>
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}
