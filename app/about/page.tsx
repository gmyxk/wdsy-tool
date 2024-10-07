'use client';

import type { IconProps } from '@iconify/react';
import { Icon } from '@iconify/react';
import { Chip, Link, Spacer } from '@nextui-org/react';

import { WdIcon } from '@/components/basic-navigation-header/social';
import { NoticeContent } from '@/components/noice';

type SocialIconProps = Omit<IconProps, 'icon'>;

const socialItems = [
  {
    name: 'QQ',
    href: 'https://qm.qq.com/cgi-bin/qm/qr?k=CnDVq8TOK3e-3d4YIpDWNAgahL5R8_4_&jump_from=webapi&authKey=X+luosQQ4rqLBTIb5R3ylL50kbGI8ohFGguqhN9zyQyDtKhCTkOeGrFBDCu0N0zR',
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="simple-icons:tencentqq" />
    ),
  },
  {
    name: 'Github',
    href: 'https://github.com/liu245933567/wdsy-tool',
    icon: (props: SocialIconProps) => <Icon {...props} icon="bi:github" />,
  },
];

const features = [
  '角色列表查询',
  '角色属性查看',
  '角色属性修改',
  '指定角色邮件发送',
  '邮件发送历史记录导入',
  '邮件发送多项组合',
  '全局邮件发送',
  '全属性装备定制',
  '全属性装备定制历史导入',
  '全属性魂器定制',
  '全属性魂器定制历史导入',
  '定制物品多项组合',
  '部分任务一键跳过',
];

export default function About() {
  return (
    <footer className="flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="flex items-center justify-center">
          <WdIcon size={44} />
          <span className="text-medium font-medium">WDB 管理工具</span>
        </div>
        <Spacer y={4} />
        <div className="text-sm">
          <p>
            该工具旨在方便游戏过程中对角色的管理, 采用交互扁平化设计，
            用户可以快速的实现对游戏角色进行信息修改、物品修改。目前本人缺乏对该游戏数据库表结构的了解，希望对数据库有研究的朋友若有兴趣的话能提供一些帮助。届时将共享代码及成果
          </p>
          <NoticeContent />
          <div className="mt-8">
            <h3>目标实现功能</h3>

            <div className="mt-4 flex flex-wrap gap-4">
              {features.map((feature) => (
                <Chip
                  key={feature}
                  className="capitalize"
                  color="default"
                  variant="flat"
                >
                  {feature}
                </Chip>
              ))}
            </div>
          </div>
        </div>
        <Spacer y={6} />
        <div>有BUG或建议请联系 QQ: 245933567</div>
        <Spacer y={6} />
        <div className="flex justify-center gap-x-4">
          {socialItems.map((item) => (
            <Link
              key={item.name}
              isExternal
              className="text-default-400"
              href={item.href}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" width={24} />
            </Link>
          ))}
        </div>
        <Spacer y={4} />
        <p className="mt-1 text-center text-small text-default-400">
          &copy; 2024 山有扶苏. 本来无一物，何处惹尘埃~.
        </p>
      </div>
    </footer>
  );
}
