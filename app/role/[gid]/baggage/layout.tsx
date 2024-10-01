'use client';

import { EditBaggage } from '@/components';
import { cn } from '@/utils';
import { Icon } from '@iconify/react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

enum ActivePageIndex {
  Nav,
  Action,
}

export default function CheckBaggage({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { gid: string };
}>) {
  const pathname = usePathname();

  const isMobile = useMediaQuery('(max-width: 768px)');

  const [activePageIndex, setActivePageIndex] = React.useState<ActivePageIndex>(
    ActivePageIndex.Nav
  );

  const tabs = React.useMemo(() => {
    return [
      {
        href: `/role/${params.gid}/baggage/send-jewelry`,
        title: '发送首饰',
      },
      {
        href: `/role/${params.gid}/baggage/send-equipment`,
        title: '发送装备',
      },
      {
        href: `/role/${params.gid}/baggage/send-horcrux`,
        title: '发送魂器',
      },
      {
        href: `/role/${params.gid}/baggage/content-editor`,
        title: 'Content 编辑',
      },
    ];
  }, [params.gid]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          className={cn({
            hidden: isMobile && activePageIndex !== ActivePageIndex.Nav,
          })}
        >
          <div className="mb-4 rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100">
            <Listbox
              aria-label="Actions"
              selectionMode="single"
              hideSelectedIcon
              selectedKeys={[pathname]}
              itemClasses={{
                base: cn({
                  'data-[selected=true]:bg-default-100': !isMobile,
                }),
                title: cn('text-small font-medium text-default-500', {
                  'group-data-[selected=true]:text-foreground': !isMobile,
                }),
              }}
            >
              {tabs.map((item) => {
                return (
                  <ListboxItem
                    key={item.href}
                    as={Link}
                    href={item.href}
                    onClick={(evt) => {
                      setActivePageIndex(ActivePageIndex.Action);
                      if (pathname === item.href) {
                        evt.preventDefault();
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>{item.title}</div>
                      <Icon icon="weui:arrow-filled" width={8} />
                    </div>
                  </ListboxItem>
                );
              })}
            </Listbox>
          </div>

          <EditBaggage gid={params.gid} />
        </div>
        <div
          className={cn('xl:col-span-2', {
            hidden: isMobile && activePageIndex !== ActivePageIndex.Action,
          })}
        >
          <nav
            className={cn('mb-2 grid grid-cols-3', {
              hidden: !isMobile,
            })}
            onClick={() => {
              setActivePageIndex(ActivePageIndex.Nav);
            }}
          >
            <div className="flex items-center">
              <Icon icon="akar-icons:arrow-left" width={18} />
            </div>
            <div className="flex items-center justify-center">
              {tabs.find((item) => item.href === pathname)?.title || '操作'}
            </div>
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
}
