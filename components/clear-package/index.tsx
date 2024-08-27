'use clint';

import { axiosDelete } from '@/lib/axios';
import { useRoleStore } from '@/store';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const mutationFn = (params: { gid: string; target: string[] }) =>
  axiosDelete('/api/baggage', params);

/**
 * 清理背包
 * @returns
 */
export const ClearPackage = () => {
  const gids = useRoleStore((state) => state.selectedRoles.map((i) => i.gid));

  const { isPending, mutate } = useMutation({
    mutationFn,
    onSuccess() {
      toast.success('清理成功');
    },
    onError(error) {
      toast.error(error.message || '清理失败');
    },
  });

  const [selected, setSelected] = React.useState([
    'PAK-01',
    'PAK-02',
    'PAK-03',
    'PAK-04',
    'PAK-05',
  ]);

  return (
    <Card>
      <CardHeader>清空背包</CardHeader>
      <CardBody>
        <CheckboxGroup
          label="选择要清理的包裹"
          defaultValue={['buenos-aires', 'london']}
          value={selected}
          onValueChange={setSelected}
        >
          <Checkbox value="PAK-00">携带物品</Checkbox>
          <Checkbox value="PAK-01">背包第一页</Checkbox>
          <Checkbox value="PAK-02">背包第二页</Checkbox>
          <Checkbox value="PAK-03">背包第三页</Checkbox>
          <Checkbox value="PAK-04">背包第四页</Checkbox>
          <Checkbox value="PAK-05">背包第五页</Checkbox>
        </CheckboxGroup>
      </CardBody>
      <CardFooter>
        <Button
          color="primary"
          className="w-full"
          isLoading={isPending}
          isDisabled={gids.length === 0 || selected.length < 1}
          onClick={() => {
            mutate({
              gid: gids[0],
              target: selected,
            });
          }}
        >
          确认清空
        </Button>
      </CardFooter>
    </Card>
  );
};
