'use client';

import { testConnectRequest } from '@/api-request';
import { ControllerInput } from '@/components';
import { useTemplates } from '@/hook/useTemplates';
import { GlobalDbConfig } from '@/scheme';
import { useGloblaConfigStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Input,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { cloneDeep } from 'lodash-es';
import React from 'react';
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormGetValues,
  useWatch,
} from 'react-hook-form';
import { toast } from 'react-toastify';

const ConnectIcon = ({
  getValues,
  index,
  onSetName,
}: {
  getValues: UseFormGetValues<GlobalDbConfig>;
  index: number;
  onSetName?: (name: string) => void;
}) => {
  const { isPending, mutate } = useMutation({
    mutationFn: testConnectRequest,
    onSuccess(res) {
      toast.success('数据库连接正常');
      const database = getValues(`databases.${index}`);
      if (res.data.length > 0 && !database.name) {
        onSetName?.(res.data[0].dist);
      }
    },
    onError(error) {
      toast.error(error.message || '数据库连接异常');
    },
  });

  return (
    <Chip
      className="cursor-pointer"
      variant="faded"
      onClick={() => {
        if (isPending) {
          return;
        }
        const [connect, database] = getValues([
          'connect',
          `databases.${index}`,
        ]);

        const newDatabase = cloneDeep(database);

        newDatabase.name = '占位';

        mutate({
          connect,
          database: newDatabase,
        });
      }}
      startContent={isPending ? <Icon icon="eos-icons:loading" /> : null}
    >
      连接测试
    </Chip>
  );
};

export const DbSetting = () => {
  const dbConfig = useGloblaConfigStore((state) => state.dbConfig);

  const setDbConfig = useGloblaConfigStore((state) => state.setDbConfig);

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<GlobalDbConfig>({
    defaultValues: dbConfig,
    resolver: zodResolver(GlobalDbConfig),
  });

  const { showTemplates, addHistory, deleteHistory } =
    useTemplates<GlobalDbConfig>({
      storgeKey: 'DB_CONFIG_TEMPLATES',
      initTemplates: [],
    });

  const onSubmit: SubmitHandler<GlobalDbConfig> = (data) => {
    setDbConfig(cloneDeep(data));
    toast.success('数据库设置已保存');
    const { host, port, user } = data.connect;
    addHistory({
      templateName: `${user}@${host}:${port}`,
      data,
      deleteble: true,
    });
  };

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'databases',
  });

  const effectiveZone = useWatch({
    control,
    name: 'effectiveZone',
  });

  const databases = useWatch({
    control,
    name: 'databases',
  });

  const effectiveZoneIndex = databases?.findIndex(
    (i) => i.name === effectiveZone
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="text-base font-medium text-default-700">
          数据库连接设置
        </div>
        <div className="mt-1 text-sm font-normal text-default-400">
          请设置您的数据库连接配置，保存成功后会自动存储为历史模板
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <ControllerInput
          control={control}
          name="connect.host"
          label="数据库连接地址"
          isInvalid={!!errors?.connect?.host}
          errorMessage={errors?.connect?.host?.message}
        />
        <ControllerInput
          control={control}
          name="connect.port"
          label="端口号"
          type="number"
          isInvalid={!!errors?.connect?.port}
          errorMessage={errors?.connect?.port?.message}
        />
        <ControllerInput
          control={control}
          name="connect.user"
          label="用户名"
          isInvalid={!!errors?.connect?.user}
          errorMessage={errors?.connect?.user?.message}
        />
        <ControllerInput
          control={control}
          name="connect.password"
          label="数据库密码"
          className="m-x-8"
          type="password"
          isInvalid={!!errors?.connect?.password}
          errorMessage={errors?.connect?.password?.message}
        />
      </div>

      <div>
        <div className="flex gap-4 text-base font-medium text-default-700">
          数据库设置
        </div>
        <div className="mt-1 text-sm font-normal text-default-400">
          配置数据库分组，可配置多项; 当区组名为空时，可以先填写 adb 和
          ddb，点击 “连接测试” 自动获取区组名
        </div>

        {errors?.effectiveZone && (
          <div className="mt-1 text-sm font-normal text-danger">
            {errors?.effectiveZone.message}
          </div>
        )}
      </div>

      {!isClient ? null : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {fields.map((item, index) => {
            return (
              <Card key={item.id}>
                <CardBody className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <div className="flex items-center gap-4">
                      {effectiveZoneIndex === index ? (
                        <Chip
                          startContent={
                            <Icon width={18} icon="icon-park-solid:check-one" />
                          }
                          className="cursor-pointer"
                          variant="faded"
                          color="success"
                        >
                          已应用
                        </Chip>
                      ) : (
                        <Chip
                          className="cursor-pointer"
                          variant="faded"
                          onClick={() => {
                            const val = getValues(`databases.${index}.name`);

                            if (!val) {
                              toast.error('请先填写区组名');
                              return;
                            }

                            setValue('effectiveZone', val);
                          }}
                        >
                          应用
                        </Chip>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <ConnectIcon
                        getValues={getValues}
                        index={index}
                        onSetName={(val) => {
                          setValue(`databases.${index}.name`, val);
                        }}
                      />
                      {fields.length > 1 ? (
                        <Chip
                          onClick={() => {
                            remove(index);
                          }}
                          className="cursor-pointer"
                          variant="faded"
                          color="danger"
                        >
                          移除
                        </Chip>
                      ) : null}
                    </div>
                  </div>
                  <ControllerInput
                    label="区组名"
                    size="sm"
                    control={control}
                    name={`databases.${index}.name`}
                    placeholder="可通过连接测试完善"
                    isInvalid={!!errors?.databases?.[index]?.name}
                    errorMessage={errors?.databases?.[index]?.name?.message}
                  />
                  <ControllerInput
                    label="账号库"
                    size="sm"
                    control={control}
                    name={`databases.${index}.sdk`}
                    placeholder="可通过连接测试完善"
                    isInvalid={!!errors?.databases?.[index]?.sdk}
                    errorMessage={errors?.databases?.[index]?.sdk?.message}
                  />
                  <ControllerInput
                    label="ADB"
                    size="sm"
                    control={control}
                    name={`databases.${index}.adb`}
                    isInvalid={!!errors?.databases?.[index]?.adb}
                    errorMessage={errors?.databases?.[index]?.adb?.message}
                  />
                  <ControllerInput
                    label="DDB"
                    size="sm"
                    control={control}
                    name={`databases.${index}.ddb`}
                    isInvalid={!!errors?.databases?.[index]?.ddb}
                    errorMessage={errors?.databases?.[index]?.adb?.message}
                  />
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}

      <Input className="hidden" {...register('effectiveZone')} />

      <Button
        variant="bordered"
        onClick={() => {
          append({ name: '', sdk: '', adb: '', ddb: '' });
        }}
      >
        添加数据库设置
      </Button>

      <Button type="submit" color="primary">
        保存设置
      </Button>

      <Divider />

      {showTemplates.length > 0 && (
        <div>
          <div className="flex gap-4 text-base font-medium text-default-700">
            历史记录
          </div>
          <div className="mt-1 text-sm font-normal text-default-400">
            可通过点击下方选项导入设置
          </div>

          <div className="mt-4 grid gap-4">
            {showTemplates.map(({ templateName, data }) => {
              return (
                <Card key={templateName}>
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div>
                        <Chip
                          size="sm"
                          className="mr-2 cursor-pointer"
                          onClick={() => {
                            deleteHistory(templateName);
                          }}
                        >
                          删除
                        </Chip>
                        {templateName}
                      </div>
                      <Chip
                        className="cursor-pointer"
                        onClick={() => {
                          reset(cloneDeep(data));
                          toast.success('已从模板导入设置');
                        }}
                        endContent={
                          <Icon width={10} icon="weui:arrow-filled" />
                        }
                      >
                        导入至当前
                      </Chip>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </form>
  );
};
