import { InData, useTemplates } from '@/hook/useTemplates';
import { cn } from '@/utils';
import { Icon } from '@iconify/react';
import { Button, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

export type TemplatePiakerActionRef<T = any> = {
  saveToHistory: (data: InData<T>) => void;
};

interface TemplatePiakerProps<T = any> {
  storgeKey: string;
  initTemplates?: InData<T>[];
  mutationFn?: (records: T[]) => Promise<API.ResponsTpl>;
  classNames?: {
    content?: string;
  };
  actionRef?: React.MutableRefObject<TemplatePiakerActionRef | undefined>;
  children: (
    record: InData<T>,
    props: {
      deleteHistory: (templateName: string) => void;
      toggleSelectTemplate: (templateName: string) => void;
      isSelected: boolean;
    }
  ) => JSX.Element;
  onSendSuccess?: () => void;
}

/**
 * 模板选择器
 * @param props
 * @returns
 */
export const TemplatePiaker = <T extends any>(
  props: TemplatePiakerProps<T>
) => {
  const {
    initTemplates = [],
    mutationFn,
    classNames,
    actionRef,
    children,
    storgeKey,
    onSendSuccess,
  } = props;

  const {
    clearSelectedTemplate,
    showTemplates,
    selectedTemplates,
    toggleSelectTemplate,
    addHistory,
    deleteHistory,
    toQueryTemplate,
  } = useTemplates<T>({
    storgeKey,
    initTemplates,
  });

  const { isPending, mutate } = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success('发送成功');
      onSendSuccess?.();
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  React.useImperativeHandle(actionRef, () => ({
    saveToHistory: addHistory,
  }));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          placeholder="模糊查询模板历史记录"
          onValueChange={toQueryTemplate}
          startContent={<Icon icon="mdi:magnify" />}
          isClearable
        />
        <Button
          color="primary"
          isDisabled={!selectedTemplates.length}
          isLoading={isPending}
          onClick={() => {
            mutate(
              selectedTemplates.map((items) => {
                return items.data;
              })
            );
          }}
        >
          确认发放
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          当前已选中 {selectedTemplates.length} 个模板
        </div>
        <Button
          color="primary"
          variant="light"
          onClick={() => {
            clearSelectedTemplate();
          }}
        >
          清空所选
        </Button>
      </div>

      <div
        className={cn(
          'grid grid-cols-3 gap-2 overflow-y-auto',
          classNames?.content
        )}
      >
        {showTemplates.map((item) => {
          const isSelected = selectedTemplates.some(
            (i) => i.templateName === item.templateName
          );

          return children(item, {
            deleteHistory,
            toggleSelectTemplate,
            isSelected,
          });
        })}
      </div>
    </div>
  );
};
