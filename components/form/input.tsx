'use client';

import {
  Input,
  InputProps,
  Select,
  SelectProps,
  SharedSelection,
} from '@nextui-org/react';
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
      valueFormat?: (
        value: PathValue<TFieldValues, TName>
      ) => PathValue<TFieldValues, TName>;
      changeFormat?: (
        value: PathValue<TFieldValues, TName>
      ) => PathValue<TFieldValues, TName>;
    }
) => {
  const { control, name, type, valueFormat, changeFormat, ...rest } = props;

  const inputProps = pick(rest, [
    'labelPlacement',
    'isInvalid',
    'errorMessage',
    'label',
    'size',
    'className',
    'classNames',
    'placeholder',
    'endContent',
    'startContent',
    'aria-labelledby',
  ]);

  const formatValue = (value: PathValue<TFieldValues, TName>) => {
    if (value === undefined || value === null) {
      return value;
    }
    if (valueFormat) {
      return valueFormat(value);
    } else {
      return value;
    }
  };

  const formatChangeValue = (value: string) => {
    if (value === undefined || value === null) {
      return value;
    }

    let val = type === 'number' ? Number(value) : value;

    if (changeFormat) {
      val = changeFormat(val as PathValue<TFieldValues, TName>);
    }

    return val;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState }) => (
        <Input
          name={name}
          type={type}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          value={formatValue(value)}
          onValueChange={(val) => {
            onChange(formatChangeValue(val));
          }}
          {...inputProps}
        />
      )}
    />
  );
};

export const ControllerSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Item extends object = object,
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
    'aria-labelledby',
  ]);

  const formatValue = (value: PathValue<TFieldValues, TName>) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    if (type === 'number') {
      if (selectProps.selectionMode === 'multiple') {
        return (value as number[]).map((i) => i.toString());
      } else {
        return (value as number).toString();
      }
    }

    if (selectProps.selectionMode === 'multiple') {
      return value;
    }

    return [value];
  };

  const formatChangeValue = (value: SharedSelection) => {
    const val = [...value] as string[];

    if (type === 'number') {
      if (selectProps.selectionMode === 'multiple') {
        return val.map(Number);
      } else {
        return Number(val);
      }
    }
    if (selectProps.selectionMode === 'multiple') {
      return val;
    }

    return val[0];
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Select
            selectedKeys={formatValue(value)}
            onSelectionChange={(v) => {
              onChange(formatChangeValue(v));
            }}
            {...selectProps}
          />
        );
      }}
    />
  );
};
