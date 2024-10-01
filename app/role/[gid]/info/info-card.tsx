'use client';

import { editRoleInfoRequest, getRoleInfoRequest } from '@/api-request';
import { ControllerInput, ControllerSelect } from '@/components';
import { CLAZZ, GENDER, RISE_TYPE } from '@/config';
import { pointsToYearsDaysPoints } from '@/lib/game-data';
import { EditRoleInfoPayload } from '@/scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SelectItem,
  Skeleton,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { pick } from 'lodash-es';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type CellValueProps = {
  label: string;
  value?: React.ReactNode;
  isEditing?: boolean;
  editorRender?: () => React.ReactNode;
  children?: React.ReactNode;
};

const CellValue = ({
  label,
  value,
  children,
  isEditing,
  editorRender,
  ...props
}: CellValueProps) => {
  return (
    <div className="flex items-center justify-between" {...props}>
      <div className="text-small text-default-500">{label}</div>
      {isEditing && editorRender ? (
        <div>{editorRender()}</div>
      ) : (
        <div className="flex h-8 items-center text-small font-medium">
          {value || children || '无'}
        </div>
      )}
    </div>
  );
};

CellValue.displayName = 'CellValue';

export const InfoCrad = ({ gid }: { gid: string }) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['roleInfo', gid],
    queryFn: ({ queryKey }) => getRoleInfoRequest(queryKey[1]),
  });

  const { control, handleSubmit, reset } = useForm<EditRoleInfoPayload>({
    resolver: zodResolver(EditRoleInfoPayload),
  });

  useEffect(() => {
    if (data?.data) {
      reset(
        pick(data.data, [
          'level',
          'ability',
          'gender',
          'clazz',
          'riseType',
          'yuanBabyLevel',
          'consumptions',
        ])
      );
    }
  }, [data?.data, reset]);

  const onSubmit: SubmitHandler<EditRoleInfoPayload> = async (data) => {
    try {
      await editRoleInfoRequest({
        gid,
        payload: data,
      });
      toast.success('修改成功');
      refetch();
    } catch (error) {
      toast.error((error as Error).message || '修改失败');
    }
  };

  const [isEditing, setIsEditing] = React.useState(false);

  if (isPending || !data) {
    return <Skeleton className="h-96 w-full rounded-lg" />;
  }

  const info = data.data;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-2">
        <CardHeader className="justify-between">
          <div className="flex flex-col items-start">
            <p className="text-md">{info.roleName}</p>
            <p className="text-tiny text-default-500">@{info.account}</p>
          </div>
          <div className='flex gap-2'>
            <Button
              size="sm"
              onClick={() => {
                refetch();
              }}
              isIconOnly
            >
              <Icon icon="material-symbols:refresh" width={24} />
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
              {...(isEditing
                ? {
                    color: 'danger',
                    variant: 'bordered',
                  }
                : {
                    color: 'primary',
                  })}
            >
              {isEditing ? '取消' : '编辑'}
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-2">
          <CellValue
            label="等级"
            value={`Lv.${info.level}`}
            isEditing={isEditing}
            editorRender={() => (
              <ControllerInput
                control={control}
                name="level"
                aria-labelledby="等级"
                size="sm"
                type="number"
                className="w-40"
              />
            )}
          />
          <CellValue
            label="门派"
            value={CLAZZ[info.clazz]}
            isEditing={isEditing}
            editorRender={() => (
              <ControllerSelect
                control={control}
                placeholder="选择门派"
                name="clazz"
                className="w-40"
                aria-labelledby="门派"
                type="number"
                size="sm"
              >
                {Object.entries(CLAZZ).map(([k, v]) => (
                  <SelectItem key={k}>{v}</SelectItem>
                ))}
              </ControllerSelect>
            )}
          />
          <CellValue
            label="性别"
            value={GENDER[info.gender]}
            isEditing={isEditing}
            editorRender={() => (
              <ControllerSelect
                control={control}
                name="gender"
                type="number"
                className="w-40"
                aria-labelledby="门派"
                size="sm"
              >
                {Object.entries(GENDER).map(([k, v]) => (
                  <SelectItem key={k}>{v}</SelectItem>
                ))}
              </ControllerSelect>
            )}
          />
          <CellValue
            label="道行"
            value={pointsToYearsDaysPoints(info.ability)}
            isEditing={isEditing}
            editorRender={() => (
              <ControllerInput
                control={control}
                name="ability"
                size="sm"
                type="number"
                className="w-40"
                valueFormat={(val) =>
                  val === undefined ? val : Math.ceil(val / 360)
                }
                changeFormat={(val) => (val === undefined ? val : val * 360)}
                endContent="年"
              />
            )}
          />
          <CellValue
            label="仙魔"
            isEditing={isEditing}
            value={info.riseType ? RISE_TYPE[info.riseType] : undefined}
            editorRender={
              info.riseType === undefined ||
              (info.riseType !== 3 && info.riseType !== 4)
                ? undefined
                : () => (
                    <ControllerSelect
                      control={control}
                      name="riseType"
                      type="number"
                      className="w-40"
                      aria-labelledby="仙魔"
                      size="sm"
                    >
                      {Object.entries(RISE_TYPE).map(([key, label]) => (
                        <SelectItem key={key}>{label}</SelectItem>
                      ))}
                    </ControllerSelect>
                  )
            }
          />
          <CellValue
            label="元婴等级"
            value={info.yuanBabyLevel ? `Lv.${info.yuanBabyLevel}` : undefined}
            isEditing={isEditing}
            editorRender={
              info.yuanBabyLevel === undefined
                ? undefined
                : () => (
                    <ControllerInput
                      control={control}
                      name="yuanBabyLevel"
                      aria-labelledby="元婴等级"
                      size="sm"
                      type="number"
                      className="w-40"
                    />
                  )
            }
          />
          <CellValue
            label="消费积分"
            value={info.consumptions ? info.consumptions : undefined}
            isEditing={isEditing}
            editorRender={
              info.consumptions === undefined
                ? undefined
                : () => (
                    <ControllerInput
                      control={control}
                      name="consumptions"
                      aria-labelledby="消费积分"
                      size="sm"
                      type="number"
                      className="w-40"
                    />
                  )
            }
          />
        </CardBody>
        {isEditing && (
          <CardFooter>
            <Button type="submit" size="sm" color="primary" className="w-full">
              保存
            </Button>
          </CardFooter>
        )}
      </Card>
    </form>
  );
};
