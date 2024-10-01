'use client';

import { getRoleInfoRequest } from '@/api-request';
import { DashbordNav, RoleInfo, RoleInfoSkeleton } from '@/components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Divider } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

const RoleInfoTop = ({ gid }: { gid: string }) => {
  const { isPending, data } = useQuery({
    queryKey: ['roleInfo', gid],
    queryFn: ({ queryKey }) => getRoleInfoRequest(queryKey[1]),
  });

  if (isPending || !data?.data) {
    return <RoleInfoSkeleton />;
  }

  return <RoleInfo data={data.data} />;
};

export default function RoleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { gid: string };
}>) {
  const navs = React.useMemo(() => {
    return [
      {
        href: `/role/${params.gid}/info`,
        title: '信息',
      },
      {
        href: `/role/${params.gid}/baggage`,
        title: '包裹',
      },
      {
        href: `/role/${params.gid}/pat`,
        title: '宠物',
      },
      {
        href: `/role/${params.gid}/mail`,
        title: '邮件',
      },
      {
        href: `/role/${params.gid}/taiyin`,
        title: '太阴之气',
      },
      {
        href: `/role/${params.gid}/wuhun`,
        title: '武魂精魄',
      },
    ];
  }, [params.gid]);

  return (
    <div className="mt-[-16px]">
      <div className="flex items-center">
        <Button isIconOnly as={Link} href="/dashboard/roles" className="mr-2">
          <Icon icon="mingcute:back-fill" width={22} />
        </Button>

        <RoleInfoTop gid={params.gid} />
      </div>
      <Divider className="mt-2" />
      <DashbordNav navs={navs} pathnameLevel={3} />
      {children}
    </div>
  );
}
