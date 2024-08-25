'use client';

import {
  HORCRUX_ATTR_DARK,
  HORCRUX_ATTR_LIGHT,
  HORCRUX_PRE_TPL,
} from '@/config';
import { useTemplates } from '@/hook/useTemplates';
import { cn } from '@/utils';
import { SendHorcruxItem } from '@/verification';
import { Icon } from '@iconify/react';
import { Button, Card, CardBody, Divider, Input } from '@nextui-org/react';
import { useRequest } from 'ahooks';
import React from 'react';
import { toast } from 'react-toastify';
import { requestSendHorcruxApi } from './request';

const attrMap = [...HORCRUX_ATTR_LIGHT, ...HORCRUX_ATTR_DARK].reduce<
  Record<string, string>
>((pre, cur) => {
  pre[cur.value] = cur.label;
  return pre;
}, {});

export type HorcruxTplActionRef = {
  saveHistory: (data: { templateName: string; data: SendHorcruxItem }) => void;
};

export const HorcruxTpl = (props: {
  gids: string[];
  actionRef?: React.MutableRefObject<HorcruxTplActionRef | undefined>;
}) => {
  const { gids } = props;

  const {
    clearSelectedTemplate,
    showTemplates,
    selectedTemplates,
    toggleSelectTemplate,
    addHistory,
    deleteHistory,
  } = useTemplates({
    storgeKey: 'horcrux-tpl',
    initTemplates: HORCRUX_PRE_TPL,
  });

  React.useImperativeHandle(props.actionRef, () => ({
    saveHistory: addHistory,
  }));

  const { loading, run } = useRequest(requestSendHorcruxApi, {
    manual: true,
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
        <Input placeholder="模糊查询" size="sm" />
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
      <div className="grid grid-cols-2 gap-2">
        {showTemplates.map((item) => {
          const { templateName, data } = item;

          const isSelected = selectedTemplates.some(
            (i) => i.templateName === templateName
          );

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
                          {attrMap[attr.darkAttribute]}{' '}
                          {attr.darkAttributeValue}
                        </div>
                      </div>
                    );
                  })}
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
        isLoading={loading}
        onClick={() => {
          run({
            gid: gids[0],
            horcruxs: selectedTemplates.map((item) => item.data),
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
