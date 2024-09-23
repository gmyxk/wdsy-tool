import { Input, InputProps, Select, SelectProps } from '@nextui-org/react';
import { pick } from 'lodash-es';
import type {
  ControllerProps,
  FieldPath,
  FieldValues,
  PathValue,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

export const ControllerInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Omit<ControllerProps<TFieldValues, TName>, 'render'> &
    InputProps & {
      beforeChngeFormat?: (
        value: PathValue<TFieldValues, TName>
      ) => PathValue<TFieldValues, TName>;
      beforeValueFormat?: (
        value: PathValue<TFieldValues, TName>
      ) => PathValue<TFieldValues, TName>;
    }
) => {
  const { control, name, type, beforeChngeFormat, beforeValueFormat, ...rest } =
    props;

  const inputProps = pick(rest, [
    'labelPlacement',
    'isInvalid',
    'errorMessage',
    'label',
    // 'size',
    // 'className',
    // 'classNames',
    // 'placeholder',
    // 'endContent',
    // 'startContent',
  ]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          // value={beforeValueFormat ? beforeValueFormat(value) : value}
          // onValueChange={(val) => {
          //   console.log('type = ', type);
          //   const v =
          //     val === undefined ? val : type === 'number' ? Number(val) : val;

          //   const result =
          //     v === undefined
          //       ? undefined
          //       : beforeChngeFormat
          //         ? beforeChngeFormat(v as PathValue<TFieldValues, TName>)
          //         : v;

          //   console.log(result);
          //   console.log('result = ', typeof result);

          //   onChange(result);
          // }}
          {...inputProps}
        />
      )}
    />
  );
};

export const ControllerSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Item extends object = any,
>(
  props: Omit<ControllerProps<TFieldValues, TName>, 'render'> &
    SelectProps<Item> & {
      type?: 'number' | 'text';
    }
) => {
  const { control, name, type, ...rest } = props;

  const selectProps = pick(rest, [
    'items',
    'labelPlacement',
    'isInvalid',
    'errorMessage',
    'label',
    'size',
    'children',
    'selectionMode',
    'className',
    'classNames',
    'placeholder',
    'endContent',
    'startContent',
  ]);

  const renderValue = (val: string | number) => {
    return val.toString();
  };

  const renderChangeValue = (val: string) => {
    if (type === 'number') {
      return Number(val);
    } else {
      return val;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        console.log('value', value);
        console.log('value type', typeof value);
        return (
          <Select
            selectedKeys={
              value === undefined
                ? []
                : selectProps.selectionMode === 'multiple'
                  ? (value as any[]).map(renderValue)
                  : [renderValue(value)]
            }
            onSelectionChange={(v) => {
              const val = [...v];

              if (selectProps.selectionMode === 'multiple') {
                onChange((val as string[]).map(renderChangeValue));
                return;
              } else {
                onChange(
                  val[0] ? renderChangeValue(val[0] as string) : undefined
                );
              }
            }}
            {...selectProps}
          />
        );
      }}
    />
  );
};
