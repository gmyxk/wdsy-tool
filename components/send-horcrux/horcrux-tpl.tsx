'use client';

import {
  HORCRUX_ATTR_DARK,
  HORCRUX_ATTR_LIGHT,
  HORCRUX_PRE_TPL,
} from '@/config';
import { SendHorcruxItem } from '@/scheme';
import { cn } from '@/utils';
import { Icon } from '@iconify/react';
import { Card, CardBody, Divider } from '@nextui-org/react';
import { SendTemplateCommonProps } from '../send-common';
import { TemplatePiaker } from '../template-picker';

const attrMap = [...HORCRUX_ATTR_LIGHT, ...HORCRUX_ATTR_DARK].reduce<
  Record<string, string>
>((pre, cur) => {
  pre[cur.value] = cur.label;
  return pre;
}, {});

export const SendHorcruxTemplate = ({
  onSendSuccess,
  mutationFn,
  actionRef,
}: SendTemplateCommonProps<SendHorcruxItem>) => {
  return (
    <TemplatePiaker<SendHorcruxItem>
      storgeKey="TPL_HORCRUX"
      initTemplates={HORCRUX_PRE_TPL}
      mutationFn={(horcruxs) => mutationFn({ records: horcruxs })}
      onSendSuccess={onSendSuccess}
      classNames={{
        content: 'grid-cols-2',
      }}
      actionRef={actionRef}
    >
      {(item, { isSelected, toggleSelectTemplate, deleteHistory }) => {
        const { templateName, data } = item;

        return (
          <Card
            key={templateName}
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
              <div className="text-sm">{templateName}</div>
              <div className="my-2 text-sm">
                Lv.{data.level} {data.name}
                {data.skillLevel}级
              </div>

              <div className="text-tiny text-foreground-400">
                <div>
                  混沌值{data.chaosValue} / 阳属比例{data.lightProportion}
                </div>
                {data.attributes.map((attr, index) => {
                  return (
                    <div key={`${index}`} className="flex">
                      <div>
                        {attrMap[attr.lightAttribute]}{' '}
                        {attr.lightAttributeValue}
                      </div>
                      <Divider orientation="vertical" className="mx-1" />
                      <div>
                        {attrMap[attr.darkAttribute]} {attr.darkAttributeValue}
                      </div>
                    </div>
                  );
                })}
              </div>
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
