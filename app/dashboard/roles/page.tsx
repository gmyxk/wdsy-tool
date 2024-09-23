'use client';

import { getRolesRequest } from '@/api-request';
import { RoleInfo, RoleInfoSkeleton } from '@/components/role-info';
import { useClient } from '@/hook';
import { useRoleStore } from '@/store';
import { Icon } from '@iconify/react';
import { Button, Card, CardBody, Input, Pagination } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash-es';
import Link from 'next/link';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

function RolesPage() {
  const { data, isPending, isFetching, isLoading, refetch, error } = useQuery({
    queryKey: ['roles'],
    queryFn: getRolesRequest,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  const isClient = useClient();

  const [searchText, setSearchText] = React.useState('');

  const setSelectedRoles = useRoleStore((state) => state.setSelectedRoles);

  const [page, setPage] = React.useState(1);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const rowsPerPage = isMobile ? 20 : 50;

  const debouncedSearch = debounce((query: string) => {
    setPage(1);
    setSearchText(query);
  }, 1000);

  const filteredList = React.useMemo(() => {
    if (!data?.data) {
      return [];
    }
    if (!searchText) {
      return data.data;
    }

    return data.data.filter(
      (item) =>
        item.roleName.includes(searchText) ||
        searchText.includes(item.roleName) ||
        item.account?.includes(searchText)
    );
  }, [data, searchText]);

  const onLineNumber = React.useMemo(() => {
    return data?.data?.filter((item) => item.status === 1).length || 0;
  }, [data]);

  const renderContent = () => {
    if (isPending || isFetching || isLoading || !isClient) {
      return Array.from({ length: 20 }).map((_, index) => (
        <Card key={index}>
          <CardBody className="py-2">
            <RoleInfoSkeleton />
          </CardBody>
        </Card>
      ));
    }

    const list = filteredList.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );

    return list.map((item) => {
      return (
        <Card key={item.gid}>
          <CardBody className="py-2">
            <Link
              href={`/role/${item.gid}`}
              onClick={() => {
                setSelectedRoles([item]);
              }}
            >
              <RoleInfo data={item} />
            </Link>
          </CardBody>
        </Card>
      );
    });
  };

  const renderFooter = () => {
    if (isFetching || !isClient) {
      return null;
    }
    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-xs">
          共 {data?.data?.length || 0} 位角色，在线人数 {onLineNumber || 0}
        </div>
        {filteredList.length === 0 ? null : (
          <Pagination
            isCompact
            showControls
            total={Math.ceil(filteredList.length / rowsPerPage)}
            page={page}
            onChange={setPage}
          />
        )}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-4">
      <div className="sticky top-4 z-10 flex gap-4">
        <Input
          type="email"
          placeholder="可输入角色名或账号进行模糊匹配"
          endContent={<Icon icon="ion:search-outline" width={18} />}
          onValueChange={(val) => debouncedSearch(val)}
        />
        <Button color="primary" onClick={() => refetch()}>
          <Icon
            className="text-default-500"
            icon="material-symbols:refresh"
            width={24}
          />
          刷新
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {renderContent()}
      </div>

      {renderFooter()}
    </div>
  );
}

export default RolesPage;
