'use client';

import { axiosGet } from '@/lib/axios';
import { useRoleStore } from '@/store';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  cn,
  Input,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Spinner,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash-es';
import React, { useEffect, useMemo } from 'react';
import { RoleInfo } from '../role-info';

interface RoleListProps {
  className?: string;
}

export const RoleList = (props: RoleListProps) => {
  const selectedRoles = useRoleStore((state) => state.selectedRoles);

  const setSelectedRoles = useRoleStore((state) => state.setSelectedRoles);

  const setRoles = useRoleStore((state) => state.setRoles);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['roles'],
    queryFn: () => axiosGet<API.RoleListItem[]>('/api/roles'),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: false,
  });

  useEffect(() => {
    setRoles(data?.data || []);
  }, [setRoles, data]);

  const [searchName, setSearchName] = React.useState('');

  const debouncedSearch = debounce(
    (query: string) => setSearchName(query),
    1000
  );

  const filteredList = React.useMemo(() => {
    if (!data?.data) {
      return [];
    }
    if (!searchName) {
      return data.data;
    }

    return data.data.filter(
      (item) =>
        item.roleName.includes(searchName) || searchName.includes(item.roleName)
    );
  }, [data, searchName]);

  const renderContent = () => {
    if (isLoading || isFetching) {
      return (
        <div className="flex h-full items-center justify-center">
          <Spinner color="primary" />
        </div>
      );
    }
    return (
      <Listbox
        items={filteredList}
        label="Assigned to"
        selectionMode="single"
        emptyContent="请尝试查询~"
        selectedKeys={selectedRoles.map((i) => i.gid) as unknown as Set<string>}
        onSelectionChange={(keys) => {
          const gids = [...keys];

          setSelectedRoles(
            gids
              .map((gid) => data?.data.find((i) => i.gid === gid)!)
              .filter((i) => i)
          );
        }}
        variant="flat"
      >
        {(item) => (
          <ListboxItem key={item.gid} textValue={item.roleName}>
            <RoleInfo data={item} />
          </ListboxItem>
        )}
      </Listbox>
    );
  };

  const onLineNumber = useMemo(() => {
    return data?.data.filter((item) => item.status === 1).length || 0;
  }, [data]);

  return (
    <Card className={cn('flex flex-col gap-2', props.className)}>
      <CardHeader className="flex gap-2">
        <Input
          startContent={<Icon icon="ion:search-outline" width={18} />}
          placeholder="输入角色名进行筛选"
          size="sm"
          onValueChange={(val) => debouncedSearch(val)}
          isClearable
        />
        <Button isIconOnly variant="light" size="sm" onClick={() => refetch()}>
          <Icon
            className="text-default-500"
            icon="material-symbols:refresh"
            width={24}
          />
        </Button>
      </CardHeader>
      <CardBody className="h-full p-1">
        <ScrollShadow className="h-full">{renderContent()}</ScrollShadow>
      </CardBody>
      <CardFooter className="flex justify-between text-xs">
        <div className="text-xs">
          共 {data?.data?.length} 位角色，在线人数 {onLineNumber}
        </div>
        {selectedRoles.length > 0 ? (
          <div>
            当前选中
            {selectedRoles.map((item) => (
              <Chip key={item.gid} size="sm" className="mx-2 h-4 border-none">
                {item.roleName}
              </Chip>
            ))}
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
};
