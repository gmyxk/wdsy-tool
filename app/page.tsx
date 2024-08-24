'use client';

import { axiosGet } from '@/lib/axios';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Spinner,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Empty } from 'antd';
import { debounce } from 'lodash-es';
import React from 'react';
import { JewelrySend } from './roles/jewelry';
import { MailSend } from './roles/mail';
import { RoleItem } from './roles/role-item';

export default function Home() {
  const [selectedGids, setSelectedGids] = React.useState<React.Key[]>([]);

  const [searchName, setSearchName] = React.useState('');

  const debouncedSearch = debounce(
    (query: string) => setSearchName(query),
    1000
  );

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['roles'],
    queryFn: () =>
      axiosGet<API.UserListItem[]>('/api/roles', {
        roleName: searchName,
      }),
    staleTime: 24 * 60 * 60 * 1000,
  });

  React.useEffect(() => {
    setSelectedGids([]);
  }, [data]);

  const currentSelected = data?.data?.filter((item) =>
    selectedGids.includes(item.gid)
  );

  const onLineNumber =
    data?.data.filter((item) => item.status === 1).length || 0;

  const filteredList = React.useMemo(() => {
    console.log('searchName = ', searchName);
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
        emptyContent={<Empty description="请尝试查询~" />}
        selectedKeys={selectedGids as unknown as Set<string>}
        onSelectionChange={(keys) => {
          setSelectedGids([...keys] as React.Key[]);
        }}
        variant="flat"
      >
        {(item) => (
          <ListboxItem key={item.gid} textValue={item.roleName}>
            <RoleItem data={item} />
          </ListboxItem>
        )}
      </Listbox>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card className="flex h-[calc(100vh-88px)] flex-col gap-2">
        <CardHeader className="flex gap-2">
          <Input
            startContent={<Icon icon="ion:search-outline" width={18} />}
            placeholder="输入角色名进行筛选"
            size="sm"
            onValueChange={(val) => debouncedSearch(val)}
            isClearable
          />
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => refetch()}
          >
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
          {currentSelected && currentSelected.length > 0 ? (
            <div>
              当前选中
              {currentSelected.map((item) => (
                <Chip key={item.gid} size="sm" className="mx-2 h-4 border-none">
                  {item.roleName}
                </Chip>
              ))}
            </div>
          ) : null}
        </CardFooter>
      </Card>
      <div className="col-span-1 xl:col-span-2">
        <Tabs destroyInactiveTabPanel={false}>
          <Tab title="邮件发送" key="mail">
            <MailSend gids={selectedGids as string[]} />
          </Tab>
          <Tab title="首饰发送" key="jewelry">
            <JewelrySend gids={selectedGids as string[]} />
          </Tab>
          <Tab title="装备发送" key="equipment">
            该功能暂未开放，敬请期待
          </Tab>
          <Tab title="魂器发送" key="soul-weapon">
            该功能暂未开放，敬请期待
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
