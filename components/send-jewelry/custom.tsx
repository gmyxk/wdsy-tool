'use client';
import { ATTRIBUTE_CONFIG, JEWELRY_ENUM } from '@/config';
import { InData } from '@/hook/useTemplates';
import { SendJewelryItem } from '@/scheme';
import { cn } from '@/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { SendJewelryCommonProps } from './common';

interface Inputs {
  jewelry: string;
  attributes: {
    attribute: number;
    value: number;
  }[];
  templateName?: string;
}

const defaultValues: Inputs = {
  jewelry: '80_6_闭月双环',
  attributes: [{ attribute: 65, value: 5 }],
  templateName: '',
};

const jewelrySelectOptions = JEWELRY_ENUM.map(({ level, name, type }) => {
  const typeEnum = {
    4: '项链',
    5: '玉佩',
    6: '手镯',
  };
  return {
    label: `${level}级${typeEnum[type]} ${name}`,
    value: `${level}_${type}_${name}`,
  };
});

/**
 * 发送自定义首饰
 * @param param0
 * @returns
 */
export const SendJewelryCustom = ({
  mutationFn,
  onSaveTemplate,
  onSendSuccess,
}: {
  onSaveTemplate?: (data: InData<SendJewelryItem>) => void;
} & SendJewelryCommonProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const [level, type, name] = data.jewelry.split('_');

    const jewelry = {
      level: Number(level),
      type: Number(type),
      name,
      attributes: data.attributes,
    };
    try {
      await mutationFn({ jewelrys: [jewelry] });
      if (data.templateName) {
        onSaveTemplate?.({
          templateName: data.templateName,
          data: jewelry,
          deleteble: true,
        });
      }
      toast.success('发送成功');
      onSendSuccess?.();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Select
        aria-label="首饰"
        placeholder="请选择首饰"
        {...register('jewelry', {
          required: true,
        })}
      >
        {jewelrySelectOptions.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </Select>
      <ul className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <li key={field.id} className="flex gap-2">
            <div className="grid flex-grow grid-cols-4 gap-2">
              <Controller
                name={`attributes.${index}.attribute`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    aria-label="属性"
                    className="col-span-3"
                    placeholder="请选择属性"
                    isInvalid={!!errors.attributes?.[index]?.attribute}
                    selectedKeys={value ? [value.toString()] : []}
                    onChange={(v) => {
                      onChange(
                        v.target.value ? parseInt(v.target.value) : undefined
                      );
                    }}
                  >
                    {ATTRIBUTE_CONFIG.map(({ key, description }) => (
                      <SelectItem key={key} value={key}>
                        {description}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Input
                aria-label="属性值"
                type="number"
                placeholder="属性值"
                isInvalid={!!errors.attributes?.[index]?.value}
                {...register(`attributes.${index}.value`, {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>

            <div
              className={cn('flex items-center', {
                hidden: !fields || fields.length < 2,
              })}
            >
              <Icon
                icon="carbon:subtract-filled"
                width={24}
                color="red"
                onClick={() => {
                  remove(index);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <Button
        onClick={() =>
          append(
            {} as {
              attribute: number;
              value: number;
            }
          )
        }
        startContent={<Icon width={24} icon="mdi:plus" />}
      >
        添加属性
      </Button>

      <Input
        label="模板名称"
        placeholder="该名称作为唯一值，不可与之前添加的名称重复"
        isInvalid={!!errors['templateName']}
        errorMessage={errors['templateName']?.message}
        {...register('templateName')}
      />

      <Button type="submit" color="primary" isLoading={isSubmitting}>
        确认发送
      </Button>
    </form>
  );
};
