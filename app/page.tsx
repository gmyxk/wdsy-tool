import { MenuReview } from '@/components';
import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

function HomePage() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden bg-background pt-[10dvh]">
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center gap-16 overflow-hidden px-8">
        <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
          <Button
            as={Link}
            href="/about"
            className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-default-500"
            endContent={
              <Icon
                className="flex-none outline-none [&>path]:stroke-[2]"
                icon="solar:arrow-right-linear"
                width={20}
              />
            }
            radius="full"
            variant="bordered"
          >
            了解关于更多
          </Button>
          <div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
            <div className="dark:bg-hero-section-title dark:bg-clip-text dark:text-transparent">
              更便捷的方式 <br /> 管理您的玩家数据。
            </div>
          </div>
          <p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
            本工具专注于提供更加人性化的交互方式来维护游戏数据及配置，不限终端，全平台适配，实时掌握您的玩家数据。
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button
              as={Link}
              href="/dashboard/roles"
              className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
              radius="full"
            >
              开始使用
            </Button>
            <Button
              as={Link}
              href="/settings"
              className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
              endContent={
                <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
                  <Icon
                    className="text-default-500 [&>path]:stroke-[1.5]"
                    icon="solar:arrow-right-linear"
                    width={16}
                  />
                </span>
              }
              radius="full"
              variant="bordered"
            >
              进入设置
            </Button>
          </div>
        </section>
        <section>
          <MenuReview />
        </section>
      </main>
    </div>
  );
}

export default HomePage;
