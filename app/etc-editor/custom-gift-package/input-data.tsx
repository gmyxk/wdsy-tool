import { FileSystemFactory } from "@/lib/file";
import { useEtcFileStore } from "@/store";
import { Button, Input, Textarea } from "@nextui-org/react";
import { uniqueId } from "lodash-es";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  id: string;
  name: string;
  iconId: string;
  desc: string;
  content: string;
  sellAmount: number;
};

const defaultData = {
  id: uniqueId(),
  name: "新的礼包",
  iconId: "8001",
  desc: "打开后可获得各种奖励！",
  content: "#I金元宝|金元宝#r1000000000#I",
  sellAmount: 5000,
};

const writeBasicFestivalGift = async (fileSystemFactory: FileSystemFactory) => {
  const handlen = await fileSystemFactory.getFileHandle(
    "/etc.pak/basic_festival_gift.list"
  );

  await FileSystemFactory.writeFilehandleText(
    handlen,
    "\n 123123123123123123123",
    {
      encoding: "gb2312",
      // isPush: true,
    }
  );
};

export const CustomGiftPackageForm = () => {
  const fileSystemFactory = useEtcFileStore((state) => state.fileSystemFactory);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: defaultData,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!fileSystemFactory) {
      return;
    }
    await writeBasicFestivalGift(fileSystemFactory);
    toast.success("添加成功");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
      <Input
        label="礼包名称"
        isInvalid={!!errors["name"]}
        errorMessage={errors["name"]?.message}
        {...register("name", { required: true })}
      />
      <Input
        label="礼包Id"
        isInvalid={!!errors["id"]}
        errorMessage={errors["id"]?.message}
        {...register("id", { required: true })}
      />
      <Input
        label="礼包图标"
        isInvalid={!!errors["iconId"]}
        errorMessage={errors["iconId"]?.message}
        {...register("iconId", { required: true })}
      />
      <Input
        label="出售价格"
        isInvalid={!!errors["sellAmount"]}
        errorMessage={errors["sellAmount"]?.message}
        {...register("sellAmount", { required: true })}
      />
      <Textarea
        label="礼包描述"
        className="col-span-3"
        isInvalid={!!errors["desc"]}
        errorMessage={errors["desc"]?.message}
        {...register("desc", { required: true })}
      />
      <Textarea
        label="礼包内容"
        className="col-span-3"
        isInvalid={!!errors["content"]}
        errorMessage={errors["content"]?.message}
        {...register("content", { required: true })}
      />
      <Button
        className="block"
        onClick={() => {
          reset(defaultData);
        }}
      >
        重置
      </Button>

      <Link className="block" href="/docs/mail-content-rule" target="_blank">
        <Button className="w-full">查看礼包内容添加说明</Button>
      </Link>

      <Button type="submit" color="primary" className="block">
        确认添加礼包
      </Button>
    </form>
  );
};
