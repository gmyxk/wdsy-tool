'use client';

import { SendMailItem } from '@/scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { cloneDeep } from 'lodash-es';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { SendCustomCommonProps } from '../send-common';

type SendMailFormValues = SendMailItem & {
  templateName?: string;
};

const defaultValues: SendMailFormValues = {
  title: '山有扶苏的祝福',
  message: '祝您生活愉快每一天~',
  attachment: '',
};

export const SendMailCustom = ({
  onSaveTemplate,
  onSendSuccess,
  mutationFn,
}: SendCustomCommonProps<SendMailItem>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendMailFormValues>({
    resolver: zodResolver(
      SendMailItem.merge(z.object({ templateName: z.string() }))
    ),
    defaultValues: cloneDeep(defaultValues),
  });

  const onSubmit: SubmitHandler<SendMailFormValues> = async (data) => {
    const { templateName, ...rest } = data;

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
      toast.success('邮件发送成功');
      onSendSuccess?.();
    } catch (e) {
      console.error(e);
      toast.error(`邮件发送失败: ${(e as Error).message}`);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="邮件标题"
        isInvalid={!!errors.title}
        errorMessage={errors.title?.message}
        {...register('title')}
      />
      <Input
        label="附加标题"
        isInvalid={!!errors.message}
        errorMessage={errors.message?.message}
        {...register('message', {
          required: true,
        })}
      />
      <Textarea
        label="自定义发送内容"
        placeholder={`自定义发送内容会与模板选择的内容合并，当选中 "保存为模板" 时，也会合并保存到模板发送信息中`}
        isInvalid={!!errors.attachment}
        errorMessage={errors.attachment?.message}
        {...register('attachment', {
          validate(value) {
            if (!value) {
              return true;
            }

            const regex = /^#I.*#I$/; // 匹配以#I开头和结尾的字符串
            const count = (value.match(/#I/g) || []).length; // 计算#I的数量

            if (regex.test(value) && count % 2 === 0) {
              return true;
            }

            return '请检查自定义发送内容是否正确';
          },
        })}
      />

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
