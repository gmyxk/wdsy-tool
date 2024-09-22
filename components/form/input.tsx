import { Input, InputProps } from '@nextui-org/react';
import { pick } from 'lodash-es';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

export const ControllerInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Omit<ControllerProps<TFieldValues, TName>, 'render'> & InputProps
) => {
  const { control, name, type, ...rest } = props;

  const inputProps = pick(rest, [
    'labelPlacement',
    'isInvalid',
    'errorMessage',
    'label',
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
          {...inputProps}
        />
      )}
    />
  );
};
