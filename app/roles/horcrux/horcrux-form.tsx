import {
  HORCRUX_ATTR_DARK,
  HORCRUX_ATTR_LIGHT,
  HORCRUX_PRE_TPL,
  HORCRUX_TYPE,
} from '@/config';
import { cn } from '@/utils';
import { SendHorcruxItem } from '@/verification';
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { omit } from 'lodash-es';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { requestSendHorcruxApi } from './request';

interface HorcruxFormProps {
  className?: string;
  gids: string[];
  saveHistory?: (data: { templateName: string; data: SendHorcruxItem }) => void;
}

type Inputs = SendHorcruxItem & {
  templateName?: string;
};

const defaultValues = omit(HORCRUX_PRE_TPL[0].data, ['tplName']);

/**
 * 自定义魂器发送表单
 * @param props
 * @returns
 */
export const HorcruxForm = (props: HorcruxFormProps) => {
  const { className, gids, saveHistory } = props;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: defaultValues,
  });

  const { fields } = useFieldArray({
    control,
    name: 'attributes',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { templateName, ...rest } = data;
    try {
      await requestSendHorcruxApi({
        gid: gids[0],
        horcruxs: [rest],
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
    <form
      className={cn('flex flex-col gap-4', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-3 gap-2">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              label="魂器类型"
              size="sm"
              className="col-span-2"
              placeholder="请选魂器类型性"
              isInvalid={!!errors.name}
              selectedKeys={value ? [value] : []}
              onChange={(v) => {
                onChange(v.target.value);
              }}
            >
              {HORCRUX_TYPE.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Input
          label="魂器等级"
          type="number"
          size="sm"
          isInvalid={!!errors.level}
          {...register(`level`, {
            required: true,
            valueAsNumber: true,
          })}
        />
        <Input
          label="技能等级"
          type="number"
          size="sm"
          isInvalid={!!errors.level}
          {...register(`skillLevel`, {
            required: true,
            valueAsNumber: true,
          })}
        />
        <Input
          label="混沌值"
          type="number"
          size="sm"
          isInvalid={!!errors.level}
          {...register(`chaosValue`, {
            required: true,
            valueAsNumber: true,
          })}
        />
        <Input
          label="阴属比例%"
          type="number"
          size="sm"
          isInvalid={!!errors.level}
          {...register(`lightProportion`, {
            required: true,
            valueAsNumber: true,
          })}
        />
      </div>

      <ul className="flex flex-col gap-2">
        {fields.map((field, index) => {
          return (
            <li key={field.id} className="flex flex-col gap-2">
              <Card>
                <CardBody className="flex flex-col gap-2 py-2">
                  <div className="flex gap-2">
                    <Controller
                      name={`attributes.${index}.lightAttribute`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          label={`阳属性 ${index + 1}`}
                          labelPlacement="outside-left"
                          size="sm"
                          classNames={{
                            label: 'w-20 relative top-2',
                          }}
                          isInvalid={!!errors.name}
                          selectedKeys={value ? [value] : []}
                          onChange={(v) => {
                            onChange(v.target.value);
                          }}
                        >
                          {HORCRUX_ATTR_LIGHT.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Input
                      aria-label="阳属性值"
                      type="number"
                      size="sm"
                      className="w-24"
                      isInvalid={!!errors.level}
                      {...register(`attributes.${index}.lightAttributeValue`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Controller
                      name={`attributes.${index}.darkAttribute`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          label={`阴属性 ${index + 1}`}
                          labelPlacement="outside-left"
                          size="sm"
                          classNames={{
                            label: 'w-20 relative top-2',
                          }}
                          isInvalid={!!errors.name}
                          selectedKeys={value ? [value] : []}
                          onChange={(v) => {
                            onChange(v.target.value);
                          }}
                        >
                          {HORCRUX_ATTR_DARK.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Input
                      aria-label="阴属性值"
                      type="number"
                      size="sm"
                      className="w-24"
                      isInvalid={!!errors.level}
                      {...register(`attributes.${index}.darkAttributeValue`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </CardBody>
              </Card>
            </li>
          );
        })}
      </ul>

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
