import { TableColumnProps, TableRowProps } from "@nextui-org/react";
import React from "react";

type WdColumn<T extends Record<string, any>> = Omit<
  TableColumnProps<T>,
  "children"
> &
  Omit<TableRowProps, "children"> & {
    title?: React.ReactNode;
    render?: (text: any, record: T) => React.ReactNode;
  };

export const useTableColums = <T extends Record<string, any>>(
  columns: WdColumn<T>[]
) => {
  const renderCell = (columnKey: string, record: T): React.ReactNode => {
    const tar = columns.find((i) => i.key === columnKey);

    const emptyText = "-";

    if (!tar) {
      return emptyText;
    }

    const currentValue = record[columnKey];

    return tar.render?.(currentValue, record) || currentValue;
  };

  return {
    columns,
    renderCell,
  };
};
