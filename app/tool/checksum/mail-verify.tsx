import { DBEncoder } from "@/lib/encoding";
import { Button, Input } from "@nextui-org/react";
import { Alert } from "antd";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  id: string;
  to_gid: string;
  status: string;
  title: string;
  create_time: string;
  expired_time: string;
  attachment: string;
  misc: string;
};

const ckeys: Array<keyof Inputs> = [
  "id",
  "to_gid",
  "status",
  "title",
  "create_time",
  "expired_time",
  "attachment",
  "misc",
];

export const MailVerify = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [checksum, setChecksum] = React.useState<number>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const r = DBEncoder.genChecksum(
      data.id +
        data.to_gid +
        data.status +
        data.title +
        data.status +
        data.create_time +
        data.expired_time +
        data.attachment +
        data.misc
    );

    setChecksum(r);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
      <Alert
        className="col-span-3"
        showIcon
        type="info"
        message="该算法只能校验 status = 0 的记录, 当校验 status != 0 的记录时，所计算出的数值与记录中的数值对不上，具体原因还在研究"
      />
      {ckeys.map((key) => (
        <Input
          key={key}
          label={key}
          className={
            key === "attachment" || key === "misc" ? "col-span-3" : undefined
          }
          isInvalid={!!errors[key]}
          errorMessage={errors[key]?.message}
          {...register(key, { required: true })}
        />
      ))}

      <Input
        label="计算结果 checknum"
        isDisabled
        className="col-span-3"
        value={checksum?.toString()}
      />
      <Button
        className="block"
        onClick={() => {
          reset();
          setChecksum(undefined);
        }}
      >
        重置
      </Button>
      <Button type="submit" color="primary" className="block col-span-2">
        提交
      </Button>
    </form>
  );
};
