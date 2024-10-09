import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

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

export default function ServerPage() {
  return (
    <div className="mx-auto grid max-w-96 grid-cols-1 gap-4 md:mx-0">
      {configs.map((config) => {
        return (
          <Button
            key={config.href}
            as={Link}
            className="flex"
            href={config.href}
            endContent={
              <Icon icon="iconamoon:arrow-right-2-light" width={22} />
            }
            isDisabled={config.disable}
          >
            <div className="flex-grow">{config.label}</div>
          </Button>
        );
      })}
    </div>
  );
}
