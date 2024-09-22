'use client';

import { ATTRIBUTE_ENUM, ATTRIBUTE_NAME_ENUM, EQUI_TPLS } from '@/config';
import { SendEquipmentItem } from '@/scheme';
import { cn } from '@/utils';
import { Icon } from '@iconify/react';
import { Card, CardBody, Divider } from '@nextui-org/react';
import { SendTemplateCommonProps } from '../send-common';
import { TemplatePiaker } from '../template-picker';
import { ANIS } from './request';

export const SendEquipmentTemplate = ({
  actionRef,
  mutationFn,
  onSendSuccess,
}: SendTemplateCommonProps<SendEquipmentItem>) => {
  return (
    <TemplatePiaker
      storgeKey="TPL_EQUIPMENT"
      initTemplates={EQUI_TPLS}
      mutationFn={(records) => mutationFn({ records })}
      onSendSuccess={onSendSuccess}
      classNames={{
        content: 'grid-cols-2',
      }}
      actionRef={actionRef}
    >
      {(item, { isSelected, toggleSelectTemplate, deleteHistory }) => {
        const { templateName, data } = item;

        const renderAttr = (
          attrs: typeof data.blueAttrs,
          className?: string
        ) => {
          return attrs.map((item, index) => {
            return (
              <div
                key={`${item.attribute}${index}`}
                className={cn('flex text-tiny', className)}
              >
                <div>
                  {
                    ATTRIBUTE_ENUM[
                      item.attribute as keyof typeof ATTRIBUTE_ENUM
                    ][1]
                  }
                  :
                </div>
                <div>{item.value}</div>
              </div>
            );
          });
        };

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
              </div>
              <div className="text-sm">
                {ANIS[data.anis as keyof typeof ANIS]}相性 改{data.transLevel}
              </div>

              {renderAttr(data.blueAttrs, 'text-blue-600')}
              {renderAttr(data.pinkAttrs, 'text-pink-600')}
              {renderAttr(data.yellowAttrs, 'text-yellow-600')}
              {renderAttr(data.greenAttrs, 'text-green-600')}
              {renderAttr(data.greenDarkAttrs, 'text-gray-600')}
              {renderAttr(data.transAttrs, 'text-blue-600')}

              <div className="text-tiny text-gray-600">
                共鸣:
                {ATTRIBUTE_NAME_ENUM[data.resonanceAttr] || data.resonanceAttr}
              </div>

              {item.deleteble ? (
                <div
                  onClick={(evt) => {
                    evt.stopPropagation;
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
