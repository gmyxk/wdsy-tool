import { Button } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Inputs = {
  templateName?: string;
};

const defaultValues = {
  templateName: '',
};

export const EquipmentForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { templateName, ...rest } = data;
    try {
      // await requestSendHorcruxApi({
      //   gid: gids[0],
      //   horcruxs: [rest],
      // });

      // if (templateName && saveHistory) {
      //   saveHistory({
      //     templateName,
      //     data: rest,
      //   });
      // }
      toast.success('发送成功');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Button type="submit" color="primary">
        确认发送
      </Button>
    </form>
  );
};
