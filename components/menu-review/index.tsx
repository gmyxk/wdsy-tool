'use client';

import { useInViewport } from 'ahooks';
import { Card, Image } from 'antd';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { useIsClient } from 'usehooks-ts';

interface ConfigItem {
  title: string;
  description: string;
  darkImageUrl: string;
  lightImageUrl: string;
}

const configs: ConfigItem[] = [
  {
    title: '设置页面',
    description: '可以将设置信息保存至本地，并且可以从历史记录中导入至当前设置',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703ac40eec7d.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703ac50ec384.png',
  },
  {
    title: '角色列表',
    description: '可查看当前区组所有角色',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a06303758.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a24f09301.png',
  },
  {
    title: '角色信息管理',
    description:
      '可通过表单修改当前角色部分信息，也可以直接修改 content 报文并提交',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a477f17b2.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a467f1c3b.png',
  },
  {
    title: '角色包裹管理',
    description: '可查看当前角色所携带物品，支持直接修改 content 报文并提交',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a4f802f21.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a50700132.png',
  },
  {
    title: '角色宠物管理',
    description: '可对当前角色的宠物进行增删改查操作',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/09/67068175e476d.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/09/670681680b472.png',
  },
  {
    title: '首饰发放',
    description: '支持手动填写发放，发放成功后会生成模板记录，方便直接选中发放',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a5c0ed9aa.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a594efc55.png',
  },
  {
    title: '装备发放',
    description: '支持手动填写发放，发放成功后会生成模板记录，方便直接选中发放',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a752f22b0.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a75ff22ee.png',
  },
  {
    title: '魂器发放',
    description: '支持手动填写发放，发放成功后会生成模板记录，方便直接选中发放',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a7a6f3b40.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a78101c5c.png',
  },
  {
    title: '邮件管理',
    description: '支持手动填写发放，发放成功后会生成模板记录，方便直接选中发放',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a7ddedf9d.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a7f2ef07a.png',
  },
  {
    title: '武魂精魄发放',
    description:
      '支持手动填写发放，发放成功后会生成模板记录，方便直接选中发放, 支持直接修改 content 报文并提交',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a822ec9a2.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a81808463.png',
  },
  {
    title: '全服邮件发放',
    description: '支持手动填写发放，发放成功后会生成模板记录，方便直接选中发放',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a966f1be1.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703a979f20e6.png',
  },
  {
    title: 'Checksum 计算',
    description: '便捷的计算 checksum',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703aca7eb0a9.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703ac9df0d05.png',
  },
  {
    title: 'Content 编辑',
    description: '实现了 content 和 json 格式之间的互转',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703acfc0164d.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/07/6703ad0900efe.png',
  },
  {
    title: '全服统一道行',
    description:
      '可根据等级区间，设置不同的统一道行，当角色道行超过目标道行时默认不会被统一',
    darkImageUrl: 'https://img.oneddd.com/alpha/2024/10/09/670681002e71f.png',
    lightImageUrl: 'https://img.oneddd.com/alpha/2024/10/09/6706811413490.png',
  },
];

const MenuCard = ({
  info,
  placeImageUrl,
}: {
  info: ConfigItem;
  placeImageUrl: string;
}) => {
  const { theme } = useTheme();
  const cardRef = useRef(null);
  const [inViewport] = useInViewport(cardRef);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (inViewport) {
      setLoaded(true);
    }
  }, [inViewport]);

  const imageUrl = theme === 'dark' ? info.darkImageUrl : info.lightImageUrl;

  return (
    <Card
      size="small"
      ref={cardRef}
      hoverable
      cover={
        <Image
          alt={info.title}
          src={inViewport || loaded ? imageUrl : placeImageUrl}
          preview={{
            src: imageUrl,
          }}
        />
      }
    >
      <Card.Meta title={info.title} description={info.description} />
    </Card>
  );
};

export const MenuReview = () => {
  const isClient = useIsClient();

  const [placeImageUrl, serPlaceImageUrl] = useState('');

  useEffect(() => {
    const val = window.sessionStorage.getItem('placeImageUrl');
    if (val) {
      serPlaceImageUrl(val);
      return;
    }

    // 创建 canvas 元素
    const canvas = document.createElement('canvas');
    canvas.width = 1320;
    canvas.height = 920;
    canvas.className = 'hidden';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL('image/png');
    window.sessionStorage.setItem('placeImageUrl', base64Image);
    serPlaceImageUrl(base64Image);
  }, []);

  if (!isClient || !placeImageUrl) {
    return null;
  }

  return (
    <Image.PreviewGroup>
      <canvas id="h-canvas" width="1320" height="920" className="hidden" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {configs.map((config, index) => {
          return (
            <MenuCard key={index} info={config} placeImageUrl={placeImageUrl} />
          );
        })}
      </div>
    </Image.PreviewGroup>
  );
};
