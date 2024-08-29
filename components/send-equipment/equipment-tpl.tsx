'use client';

import { ATTRIBUTE_ENUM, ATTRIBUTE_NAME_ENUM, EQUI_TPLS } from '@/config';
import { useTemplates } from '@/hook/useTemplates';
import { SendEquipmentItem } from '@/scheme';
import { useRoleStore } from '@/store';
import { cn } from '@/utils';
import { Icon } from '@iconify/react';
import { Button, Card, CardBody, Divider, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import { ANIS, sendEquipRequest } from './request';

export type EquipmentTplActionRef = {
  saveHistory: (data: {
    templateName: string;
    data: SendEquipmentItem;
  }) => void;
};

export const EquipmentTpl = (props: {
  actionRef?: React.MutableRefObject<EquipmentTplActionRef | undefined>;
}) => {
  const gids = useRoleStore((state) => state.selectedRoles.map((i) => i.gid));

  const {
    clearSelectedTemplate,
    showTemplates,
    selectedTemplates,
    toggleSelectTemplate,
    addHistory,
    deleteHistory,
    toQueryTemplate,
  } = useTemplates({
    storgeKey: 'equipment-tpl',
    initTemplates: EQUI_TPLS,
  });

  React.useImperativeHandle(props.actionRef, () => ({
    saveHistory: addHistory,
  }));

  const { isPending, mutate } = useMutation({
    mutationFn: sendEquipRequest,
    onSuccess: () => {
      toast.success('发送成功');
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return (
    <div>
      <div className="mb-4 flex">
        <Input
          placeholder="模糊查询"
          size="sm"
          isClearable
          onValueChange={toQueryTemplate}
        />
        <Button
          size="sm"
          color="primary"
          variant="light"
          onClick={() => {
            clearSelectedTemplate();
          }}
        >
          清空所选
        </Button>
      </div>
      <div className="grid max-h-[calc(100dvh-260px)] grid-cols-2 gap-2 overflow-y-auto">
        {showTemplates.map((item) => {
          const { templateName, data } = item;

          const isSelected = selectedTemplates.some(
            (i) => i.templateName === templateName
          );

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
              className={cn('mb-2 cursor-pointer', {
                'box-border border-1 border-primary': isSelected,
              })}
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
                  {ATTRIBUTE_NAME_ENUM[data.resonanceAttr] ||
                    data.resonanceAttr}
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
        })}
      </div>
      <Button
        className="mt-3 w-full"
        color="primary"
        isDisabled={!selectedTemplates.length || !gids || gids.length < 1}
        isLoading={isPending}
        onClick={() => {
          mutate({
            gid: gids[0],
            equips: selectedTemplates.map((item) => item.data),
          });
        }}
      >
        {selectedTemplates.length
          ? `发放已选选择的${selectedTemplates.length}个模板`
          : '请选择模板进行发放'}
      </Button>
    </div>
  );
};
