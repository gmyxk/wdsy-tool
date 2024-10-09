'use client';

import {
  editRoleDaoInfoRequest,
  queryGidsRequest,
  verifyNolineRequest,
} from '@/api-request';
import { ControllerInput } from '@/components';
import { UnifiedModifyDaoInfo } from '@/scheme';
import { Icon } from '@iconify/react';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import pLimit from 'p-limit';
import { useState } from 'react';
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { toast } from 'react-toastify';

const ChevronDownIcon = () => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 24 24"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
      fill="currentColor"
    />
  </svg>
);

export default function GlobalMailPage() {
  const [totalGidNumber, setTotalGidNumber] = useState(0);
  const [successGidNumber, setSuccessGidNumber] = useState(0);
  const [failedGidNumber, setFailedGidNumber] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<UnifiedModifyDaoInfo>({
    defaultValues: {
      rangeConfig: [
        {
          start: 1,
          end: 139,
          dao: 2000,
        },
      ],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'rangeConfig',
  });

  const force = useWatch({
    control,
    name: 'force',
  });

  const onSubmit: SubmitHandler<UnifiedModifyDaoInfo> = async (data) => {
    setIsPending(true);

    try {
      await verifyNolineRequest();
      const { data: gids } = await queryGidsRequest();

      setTotalGidNumber(gids.length);
      setSuccessGidNumber(0);
      setFailedGidNumber(0);

      let successNum = 0;
      let failedNum = 0;

      const limit = pLimit(10);

      const list = gids.map((item) => {
        return limit(async () => {
          try {
            await editRoleDaoInfoRequest({
              gid: item.gid,
              payload: data,
            });
            successNum += 1;
            setSuccessGidNumber((prv) => prv + 1);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            failedNum += 1;
            setFailedGidNumber((prv) => prv + 1);
          }
        });
      });

      await Promise.all(list);

      toast.info(
        `操作结束, 共 ${gids.length} 个， 成功 ${successNum} 个， 失败 ${failedNum} 个`
      );

      queryClient.invalidateQueries({
        queryKey: ['roles'],
      });
    } catch (error) {
      toast.error((error as Error).message || '验证失败');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem>
          <Link href="/dashboard/server">全服设置</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>全服统一道行</BreadcrumbItem>
      </Breadcrumbs>
      {!isPending ? (
        <div className="mb-4 flex h-8 items-center text-sm">
          修改前请确认您当前的配置, 以免造成不必要的事故!!!
        </div>
      ) : (
        <Progress
          label={`当前发放进度 (${successGidNumber + failedGidNumber}/${totalGidNumber})`}
          size="sm"
          value={successGidNumber + failedGidNumber}
          maxValue={totalGidNumber}
          showValueLabel={true}
          className="mb-4"
        />
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => {
          return (
            <div key={item.id} className="flex gap-2">
              <div className="grid flex-grow grid-cols-3 gap-2">
                <ControllerInput
                  control={control}
                  aria-label="开始等级"
                  startContent="≥"
                  endContent="级"
                  name={`rangeConfig.${index}.start`}
                  type="number"
                />
                <ControllerInput
                  control={control}
                  aria-label="结束等级"
                  startContent="≤"
                  endContent="级"
                  name={`rangeConfig.${index}.end`}
                  type="number"
                />
                <ControllerInput
                  control={control}
                  name={`rangeConfig.${index}.dao`}
                  endContent="年"
                  type="number"
                />
              </div>
              <div>
                <Button
                  isIconOnly
                  variant="light"
                  isDisabled={fields.length < 2}
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Icon icon="carbon:subtract-filled" width={24} color="red" />
                </Button>
              </div>
            </div>
          );
        })}
        <Button
          onClick={() => {
            append({
              start: 1,
              end: 139,
              dao: 2000,
            });
          }}
        >
          添加设置
        </Button>

        <ButtonGroup color="primary" className="flex">
          <Button type="submit" isLoading={isSubmitting} className="flex-grow">
            确认操作{force ? ' (强制修改道行)' : ''}
          </Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly>
                <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Merge options"
              selectionMode="single"
              selectedKeys={force ? ['force'] : ['normal']}
              onSelectionChange={(keys) => {
                const vals = [...keys];
                if (vals[0] === 'force') {
                  setValue('force', true);
                } else {
                  setValue('force', false);
                }
              }}
              className="max-w-[300px]"
            >
              <DropdownItem
                key="normal"
                description="如果处于匹配条件的角色道行大于您设置的目标道行时会跳过修改操作，保留当前道行"
              >
                普通更改
              </DropdownItem>
              <DropdownItem
                key="force"
                description="如果处于匹配条件的角色道行大于您设置的目标道行也会被修改成目标道行"
              >
                强制更改
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
      </form>
    </div>
  );
}
