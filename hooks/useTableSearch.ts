import { SortDescriptor } from "@nextui-org/react";
import { useRequest } from "ahooks";
import React from "react";

type TableParam = {
  page: {
    current: number;
    pageSize: number;
  };
  sort?: SortDescriptor;
};

type Options = {
  manual?: boolean;
};

export const useTableSearch = <D extends Record<string, any>, P = {}>(
  fn: (p: P & TableParam) => Promise<API.ResponsTpl<D[]>>,
  options?: Options
) => {
  type SearchParam = P & TableParam;

  const [param, setInParam] = React.useState({
    page: {
      current: 1,
      pageSize: 20,
    },
  } as SearchParam);

  const { data, loading, run, params } = useRequest(fn, {
    manual: options?.manual ?? true,
    defaultParams: [param],
    onBefore: (p) => {
      setInParam(p[0]);
    },
  });

  const setParam = (param: P) => {
    run({
      ...param,
      page: {
        current: 1,
        pageSize: params[0]?.page?.pageSize || 20,
      },
      sort: params[0]?.sort,
    });
  };

  const setPage = (param: TableParam["page"]) => {
    run({
      ...params[0],
      page: param,
    } as SearchParam);
  };

  const setSort = (param: SortDescriptor) => {
    run({
      ...params[0],
      sort: param,
    } as SearchParam);
  };

  return {
    data,
    param,
    loading,
    setParam,
    setPage,
    setSort,
  };
};
