'use client';

import { WUHUN_ATTRS } from '@/config';
import { SendWuhunItem } from '@/scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, SelectItem } from '@nextui-org/react';
import { cloneDeep } from 'lodash-es';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { ControllerInput, ControllerSelect } from '../form';
import { SendCustomCommonProps } from '../send-common';

type SendWuhunFormValues = SendWuhunItem & {
  templateName?: string;
};

const defaultValues: SendWuhunFormValues = {
  color: '金色',
  attributes: [WUHUN_ATTRS[0], WUHUN_ATTRS[1], WUHUN_ATTRS[2]].map((i) => ({
    attribute: i[0],
    value: 100,
  })),
};

export const SendWuhunCustom = ({
  onSaveTemplate,
  onSendSuccess,
  mutationFn,
}: SendCustomCommonProps<SendWuhunItem>) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SendWuhunFormValues>({
    resolver: zodResolver(
      SendWuhunItem.merge(z.object({ templateName: z.string() }))
    ),
    defaultValues: cloneDeep(defaultValues),
  });

  const { fields } = useFieldArray({
    control,
    name: 'attributes',
  });

  const onSubmit: SubmitHandler<SendWuhunFormValues> = async (data) => {
    const { templateName, ...rest } = data;
    console.log(data);

    try {
      await mutationFn({
        records: [rest],
      });
      if (templateName) {
        onSaveTemplate?.({
          templateName,
          data: rest,
          deleteble: true,
        });
      }
      toast.success('武魂发送成功');
      onSendSuccess?.();
    } catch (e) {
      console.error(e);
      toast.error(`武魂发送失败: ${(e as Error).message}`);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="邮件标题" className="hidden" {...register('color')} />

      {fields.map((item, index) => {
        return (
          <div key={item.id} className="grid grid-cols-2 gap-4">
            <ControllerSelect
              control={control}
              placeholder="选择属性"
              name={`attributes.${index}.attribute`}
              aria-labelledby="属性"
            >
              {WUHUN_ATTRS.map(([k, v]) => (
                <SelectItem key={k}>{v}</SelectItem>
              ))}
            </ControllerSelect>
            <ControllerInput
              control={control}
              name={`attributes.${index}.value`}
              aria-labelledby="值"
              type="number"
            />
          </div>
        );
      })}
      <Input
        label="模板名称"
        placeholder="该名称作为唯一值，不可与之前添加的名称重复"
        isInvalid={!!errors['templateName']}
        errorMessage={errors['templateName']?.message}
        {...register('templateName')}
      />
      <Button type="submit" color="primary" isLoading={isSubmitting}>
        确认发送
      </Button>
    </form>
  );
};
