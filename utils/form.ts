/**
 * 将值转换为字符串，用于 input 转换
 * @param value
 * @returns
 */
export const value2String = (value: number | undefined) => {
  if (value === undefined) {
    return value;
  }
  return value.toString();
};

/**
 * 将改变的值转换为数字，用于 input 转换
 * @param value
 * @returns
 */
export const change2NumberFactor = (fn: (...event: any[]) => void) => {
  return (val: string) => {
    fn(val === undefined ? val : Number(val));
  };
};

// export const registerSelect = <
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// >(
//   field: ControllerRenderProps<TFieldValues, TName>,
// ): Omit<SelectProps, 'selectedKeys' | ''> => {
//   const
//   return {
//     selectedKeys: [],
//   };
// };
