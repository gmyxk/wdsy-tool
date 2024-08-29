'use client';

import {
  ATTRIBUTE_ENUM,
  ATTRIBUTE_NAME_ENUM,
  EQUI_TPLS,
  EQUIPMENT_LIST,
} from '@/config';
import { SendEquipmentItem } from '@/scheme';
import { useRoleStore } from '@/store';
import { cn } from '@/utils';
import {
  Button,
  Input,
  Select,
  SelectItem,
  SelectProps,
} from '@nextui-org/react';
import React from 'react';
import {
  Controller,
  FieldPath,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { sendEquipRequest } from './request';

type Inputs = SendEquipmentItem & {
  templateName?: string;
};

const LEVEL_LIST = ['70', '80', '90', '100', '110', '120', '130', '140'];

const TYPE_LIST = {
  1: '武器',
  2: '头盔',
  3: '衣服',
  10: '鞋子',
};

const ANIS = {
  1: '金',
  2: '木',
  3: '水',
  4: '火',
  5: '土',
};

interface EquipmentFormProps {
  saveHistory?: (data: {
    templateName: string;
    data: SendEquipmentItem;
  }) => void;
}

export const EquipmentForm = ({ saveHistory }: EquipmentFormProps) => {
  const gids = useRoleStore((state) => state.selectedRoles.map((i) => i.gid));

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: EQUI_TPLS[0].data,
  });

  const level = useWatch({ control, name: 'level' });

  const type = useWatch({ control, name: 'type' });

  React.useEffect(() => {
    if (type === 1) {
      setValue('transAttrs', [
        {
          attribute: 3,
          value: 1,
        },
        {
          attribute: 64,
          value: 1,
        },
      ]);
      return;
    }
    setValue('transAttrs', [
      {
        attribute: 7,
        value: 1,
      },
      {
        attribute: 8,
        value: 1,
      },
    ]);
  }, [type, setValue]);

  const nameEnum = React.useMemo(() => {
    const list = EQUIPMENT_LIST.filter(
      (i) => i.level === level && i.type === type
    );
    return list.map((i) => ({ label: i.name, value: i.name }));
  }, [level, type]);

  React.useEffect(() => {
    setValue('name', nameEnum[0]?.value);
  }, [nameEnum, setValue]);

  const { fields: blueAttrFields } = useFieldArray({
    control,
    name: 'blueAttrs',
  });

  const { fields: pinkAttrFields } = useFieldArray({
    control,
    name: 'pinkAttrs',
  });

  const { fields: yellowAttrFields } = useFieldArray({
    control,
    name: 'yellowAttrs',
  });

  const { fields: greenAttrFields } = useFieldArray({
    control,
    name: 'greenAttrs',
  });

  const { fields: greenDarkAttrFields } = useFieldArray({
    control,
    name: 'greenDarkAttrs',
  });

  const { fields: transAttrFields } = useFieldArray({
    control,
    name: 'transAttrs',
  });

  const renderAttrItem = ({
    key,
    label,
    labelClassName,
    attrName,
    valueName,
    selectProps,
  }: {
    key: string;
    label: React.ReactNode;
    labelClassName?: string;
    attrName: FieldPath<Inputs>;
    valueName: FieldPath<Inputs>;
    selectProps?: Omit<SelectProps, 'items' | 'children'>;
  }) => {
    return (
      <div className="flex gap-2" key={key}>
        <Controller
          name={attrName}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              label={label}
              size="sm"
              items={Object.entries(ATTRIBUTE_ENUM).map(([k, v]) => ({
                value: k,
                label: v[1],
              }))}
              labelPlacement="outside-left"
              classNames={{
                label: cn('w-20 leading-8', labelClassName),
              }}
              selectedKeys={value ? [value.toString()] : []}
              onChange={(v) => {
                onChange(v.target.value ? parseInt(v.target.value) : undefined);
              }}
              {...selectProps}
            >
              {(i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              )}
            </Select>
          )}
        />
        <Input
          type="number"
          className="w-40"
          size="sm"
          {...register(valueName, {
            required: true,
            valueAsNumber: true,
          })}
        />
      </div>
    );
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { templateName, ...rest } = data;
    try {
      await sendEquipRequest({
        gid: gids[0],
        equips: [rest],
      });

      if (templateName && saveHistory) {
        saveHistory({
          templateName,
          data: rest,
        });
      }
      toast.success('发送成功');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-8 gap-2">
        <Controller
          name="level"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              label="装备等级"
              size="sm"
              className="col-span-2"
              selectedKeys={value ? [value.toString()] : []}
              items={LEVEL_LIST.map((i) => ({
                value: i,
                label: i,
              }))}
              onSelectionChange={(v) => {
                const val = [...v];

                onChange(val[0] ? parseInt(val[0] as string) : undefined);
              }}
            >
              {(item) => {
                return (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                );
              }}
            </Select>
          )}
        />
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              label="装备类型"
              size="sm"
              className="col-span-2"
              selectedKeys={value ? [value.toString()] : []}
              onChange={(v) => {
                onChange(v.target.value ? parseInt(v.target.value) : undefined);
              }}
            >
              {Object.entries(TYPE_LIST).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              label="装备名称"
              size="sm"
              className="col-span-4"
              selectedKeys={value ? [value] : []}
              onChange={(v) => {
                onChange(v.target.value);
              }}
            >
              {nameEnum.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-8 gap-2">
        <Controller
          name="anis"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              label="套装相性"
              size="sm"
              className="col-span-2"
              items={Object.entries(ANIS)}
              selectedKeys={value ? [value.toString()] : []}
              onSelectionChange={(v) => {
                const val = [...v];

                onChange(val[0] ? parseInt(val[0] as string) : undefined);
              }}
            >
              {(item) => {
                return <SelectItem key={item[0]}>{item[1]}</SelectItem>;
              }}
            </Select>
          )}
        />

        <Controller
          name="transLevel"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              label="改造等级"
              size="sm"
              className="col-span-2"
              items={Array.from({ length: 12 }, (_, i) => 12 - i).map((i) => ({
                value: i.toString(),
                label: i.toString(),
              }))}
              selectedKeys={value ? [value.toString()] : []}
              onSelectionChange={(v) => {
                const val = [...v];

                onChange(val[0] ? parseInt(val[0] as string) : undefined);
              }}
            >
              {(item) => {
                return (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                );
              }}
            </Select>
          )}
        />

        <Controller
          name="resonanceAttr"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              label="共鸣属性"
              size="sm"
              className="col-span-4"
              items={Object.entries(ATTRIBUTE_NAME_ENUM).map(([k, v]) => ({
                value: k,
                label: v,
              }))}
              selectedKeys={value ? [value] : []}
              onSelectionChange={(v) => {
                const val = [...v];
                onChange(val[0]);
              }}
            >
              {(item) => {
                return <SelectItem key={item.value}>{item.label}</SelectItem>;
              }}
            </Select>
          )}
        />
      </div>

      {blueAttrFields.map((item, index) => {
        return renderAttrItem({
          key: item.id,
          label: `蓝属性${index + 1}`,
          labelClassName: 'text-blue-600',
          attrName: `blueAttrs.${index}.attribute`,
          valueName: `blueAttrs.${index}.value`,
        });
      })}

      {pinkAttrFields.map((item, index) => {
        return renderAttrItem({
          key: item.id,
          label: `粉属性`,
          labelClassName: 'text-pink-600',
          attrName: `pinkAttrs.${index}.attribute`,
          valueName: `pinkAttrs.${index}.value`,
        });
      })}

      {yellowAttrFields.map((item, index) => {
        return renderAttrItem({
          key: item.id,
          label: `黄属性`,
          labelClassName: 'text-yellow-600',
          attrName: `yellowAttrs.${index}.attribute`,
          valueName: `yellowAttrs.${index}.value`,
        });
      })}

      {greenAttrFields.map((item, index) => {
        return renderAttrItem({
          key: item.id,
          label: `绿属性`,
          labelClassName: 'text-green-600',
          attrName: `greenAttrs.${index}.attribute`,
          valueName: `greenAttrs.${index}.value`,
        });
      })}

      {greenDarkAttrFields.map((item, index) => {
        return renderAttrItem({
          key: item.id,
          label: `套装属性`,
          labelClassName: 'text-gray-600',
          attrName: `greenDarkAttrs.${index}.attribute`,
          valueName: `greenDarkAttrs.${index}.value`,
        });
      })}

      {transAttrFields.map((item, index) => {
        return renderAttrItem({
          key: item.id,
          label: `改造属性${index + 1}`,
          labelClassName: 'text-blue-600',
          attrName: `transAttrs.${index}.attribute`,
          valueName: `transAttrs.${index}.value`,
          // 暂时放开
          // selectProps: {
          //   isDisabled: true,
          // },
        });
      })}

      <Input
        label="保存为模板"
        placeholder="当填写该字段时，将保存为模板"
        size="sm"
        {...register('templateName')}
      />

      <Button
        type="submit"
        color="primary"
        isDisabled={!gids || gids.length < 1}
        isLoading={isSubmitting}
      >
        确认发送
      </Button>
    </form>
  );
};
