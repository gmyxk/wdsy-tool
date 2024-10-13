'use client';

import { Icon } from '@iconify/react';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import React from 'react';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WdIcon } from './social';

const navList = [
  {
    href: '/dashboard',
    label: '管理面板',
  },
  {
    href: '/etc-editor',
    label: 'Etc 修改',
  },
  {
    href: '/tool',
    label: '小工具',
  },
  {
    href: '/docs/changelog',
    label: '更新日志',
  },
  {
    href: '/about',
    label: '关于',
  },
  {
    href: '/comment',
    label: '评论区',
  },
];

export default function Component() {
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      // isBordered
      // shouldHideOnScroll
      className="h-14"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
        <Link href="/" className="flex">
          <WdIcon size={22} />
          <p className="ml-1 font-bold text-inherit">WDB管理工具</p>
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="ml-4 hidden h-12 w-full max-w-fit gap-4 rounded-full bg-content2 px-4 sm:flex dark:bg-content1"
        justify="start"
      >
        {navList.map(({ href, label }) => {
          return (
            <NavbarItem key={href} isActive={pathname === href}>
              <Link className="flex gap-2 text-inherit" href={href}>
                {label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent
        className="ml-auto flex h-12 max-w-fit items-center gap-0 rounded-full p-0 lg:bg-content2 lg:px-1 lg:dark:bg-content1"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex">
          <Button
            isIconOnly
            radius="full"
            variant="light"
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
            }}
          >
            <Icon
              className="text-default-500"
              icon={theme === 'dark' ? 'solar:sun-linear' : 'solar:moon-linear'}
              width={24}
            />
          </Button>
        </NavbarItem>
        <NavbarItem className="flex">
          <Button
            isIconOnly
            radius="full"
            variant="light"
            as={Link}
            href="/settings"
          >
            <Icon
              className="text-default-500"
              icon="solar:settings-linear"
              width={24}
            />
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navList.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <NavbarMenuItem key={href} isActive={isActive}>
              <Link
                className="w-full"
                aria-current={isActive ? 'page' : undefined}
                color={isActive ? 'primary' : 'foreground'}
                href={href}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                {label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
