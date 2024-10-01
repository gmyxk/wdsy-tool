'use client';

import { DashbordNav } from '@/components';
import React from 'react';

const navs = [
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
  return (
    <div className="mt-[100vh-16px]">
      <DashbordNav navs={navs} pathnameLevel={2} />
      {children}
    </div>
  );
}
