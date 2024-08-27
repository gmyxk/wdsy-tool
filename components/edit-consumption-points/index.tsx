import { axiosPost } from '@/lib/axios';
import { EditConsumptionPointsApiReq } from '@/scheme';
import { useRoleStore } from '@/store';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const mutationFn = (params: EditConsumptionPointsApiReq) => {
  EditConsumptionPointsApiReq.parse(params);

  return axiosPost('/api/user/consumption-points', params);
};

/**
 * 修改消费积分
 * @returns
 */
export const EditConsumptionPoints = () => {
  const gids = useRoleStore((state) => state.selectedRoles.map((i) => i.gid));

  const [points, setPoints] = React.useState<number>(1000);

  const { isPending, mutate } = useMutation({
    mutationFn,
    onSuccess() {
      toast.success('修改成功');
    },
    onError(error) {
      toast.error(error.message || '修改失败');
    },
  });

  return (
    <Card>
      <CardHeader>修改消费积分</CardHeader>
      <CardBody>
        <Input
          type="number"
          value={points.toString()}
          onValueChange={(v) => {
            setPoints(Number(v) || 0);
          }}
        />
      </CardBody>
      <CardFooter>
        <Button
          color="primary"
          className="w-full"
          isLoading={isPending}
          isDisabled={gids.length === 0}
          onClick={() => {
            mutate({
              gid: gids[0],
              points,
            });
          }}
        >
          确认修改
        </Button>
      </CardFooter>
    </Card>
  );
};
