import { genChecksum } from "@/lib/game-data";
import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  gid: string;
  content: string;
};

export const UserDataVerify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [checksum, setChecksum] = React.useState<number>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const r = genChecksum("user" + data.gid + data.content);

    setChecksum(r);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="gid"
        isInvalid={!!errors.content}
        errorMessage={errors.content?.message}
        {...register("gid", { required: "请输入 gid" })}
      />
      <Textarea
        label="content"
        isInvalid={!!errors.content}
        errorMessage={errors.content?.message}
        {...register("content", { required: "请输入 content" })}
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
