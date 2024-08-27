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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import React from 'react';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import GlobalConfigCard from './global-config-card';
import { WdIcon } from './social';

const navList = [
  {
    href: '/',
    label: '用户管理',
  },
  {
    href: '/etc-editor',
    label: 'Etc 修改',
  },
  {
    href: '/db-tool',
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
];

export default function Component() {
  const { theme, setTheme } = useTheme();

  const [globalConfigOpen, setGlobalConfigOpen] = React.useState(false);

  const pathname = usePathname();

  return (
    <Navbar isBordered data-tauri-drag-region className="h-14">
      <NavbarBrand data-tauri-drag-region>
        <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
        {/* <AcmeIcon /> */}
        <WdIcon />
        <p className="font-bold text-inherit">WDB管理工具</p>
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
          <Popover
            offset={12}
            placement="bottom-end"
            isOpen={globalConfigOpen}
            onOpenChange={(o) => setGlobalConfigOpen(o)}
          >
            <PopoverTrigger>
              <Button isIconOnly radius="full" variant="light">
                <Icon
                  className="text-default-500"
                  icon="solar:settings-linear"
                  width={24}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
              <GlobalConfigCard
                className="w-full shadow-none"
                onSaved={() => {
                  toast.success('保存设置成功');
                  setGlobalConfigOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
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
