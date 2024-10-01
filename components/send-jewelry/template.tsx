'use client';

import { ATTRIBUTE_CONFIG, INITIAL_JEWELRY } from '@/config';
import { InData } from '@/hook/useTemplates';
import { SendJewelryItem } from '@/scheme';
import { cn } from '@/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Card, CardBody, Divider } from '@nextui-org/react';
import React from 'react';
import { TemplatePiaker, TemplatePiakerActionRef } from '../template-picker';
import { SendJewelryCommonProps } from './common';

export type JewelryTplActionRef = {
  saveToHistory: (data: InData<SendJewelryItem>) => void;
};

/**
 * 发送模板首饰
 * @param param0
 * @returns
 */
export const SendJewelryTemplate = ({
  mutationFn,
  onSendSuccess,
  actionRef,
}: {
  actionRef?: React.MutableRefObject<
    TemplatePiakerActionRef<SendJewelryItem> | undefined
  >;
} & SendJewelryCommonProps) => {
  const attrMap = React.useMemo(() => {
    const map = new Map<number, string>();

    ATTRIBUTE_CONFIG.forEach((item) => {
      map.set(item.key, item.description);
    });

    return map;
  }, []);

  return (
    <TemplatePiaker
      storgeKey="TPL_JEWELRY"
      initTemplates={INITIAL_JEWELRY.map(({ key, title, attributes }) => {
        const [level, type, name] = key.split('_');
        return {
          templateName: title,
          data: {
            level: Number(level),
            type: Number(type),
            name,
            attributes,
          },
        };
      })}
      mutationFn={(jewelrys) => mutationFn({ jewelrys })}
      onSendSuccess={onSendSuccess}
      actionRef={actionRef}
    >
      {(item, { isSelected, toggleSelectTemplate, deleteHistory }) => {
        const jewelry = item.data;

        return (
          <Card
            key={item.templateName}
            className={cn(
              'box-border cursor-pointer border-1',
              isSelected ? 'border-primary' : 'border-transparent'
            )}
          >
            <CardBody
              onClick={() => {
                toggleSelectTemplate(item.templateName);
              }}
            >
              <div className="text-tiny text-inherit">{item.templateName}</div>
              <div className="text-small text-inherit">{jewelry.name}</div>
              {jewelry.attributes.map((item, index) => {
                const attr = attrMap.get(item.attribute);
                return (
                  <div
                    key={`${item.attribute}${index}`}
                    className="text-tiny text-foreground-400"
                  >
                    {attr || '??'} {item.value}
                  </div>
                );
              })}
              {item.deleteble ? (
                <div
                  onClick={(evt) => {
                    evt.stopPropagation();
                    deleteHistory(item.templateName);
                  }}
                >
                  <Divider className="my-2" />
                  <div className="flex items-center text-tiny text-inherit">
                    <Icon
                      icon="material-symbols:delete"
                      width={16}
                      color="red"
                      className="mr-1"
                    />
                    删除该模板
                  </div>
                </div>
              ) : null}
            </CardBody>
          </Card>
        );
      }}
    </TemplatePiaker>
  );
};
