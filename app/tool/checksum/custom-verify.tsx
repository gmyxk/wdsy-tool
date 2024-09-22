import { DBEncoder } from '@/lib/encoding';
import { Button, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  content: string;
};

const placeholder = `
多个字段拼接在一起的结果: user_carry + gid + content

例如: user_carry66D95BEE2D7D040001F9(["carry":([162:"袖珍晶石:([243:0,255:([:66D98B1F10B98D000103::([]),
`

export const CustomVerify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [checksum, setChecksum] = React.useState<number>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const r = DBEncoder.genChecksum(data.content);

    setChecksum(r);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Textarea
        label="自定义内容"
        placeholder={placeholder}
        isInvalid={!!errors.content}
        errorMessage={errors.content?.message}
        {...register('content', { required: '请输入 content' })}
      />

      <Input
        label="计算结果 checknum"
        isDisabled
        value={checksum?.toString()}
      />
      <Button type="submit" color="primary" className="block w-full">
        提交
      </Button>
    </form>
  );
};
