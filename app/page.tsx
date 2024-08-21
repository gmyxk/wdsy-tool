"use client";

import React, { useEffect } from "react";
import {
  User,
  Chip,
  Listbox,
  ListboxItem,
  Input,
  Button,
  Card,
  CardBody,
  ScrollShadow,
  CardHeader,
  CardFooter,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Empty, Spin } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { debounce } from "lodash-es";
import { axiosGet } from "@/lib/axios";
import { MailSend } from "./roles/mail";

const RoleItem = ({ data }: { data: API.UserListItem }) => {
  return (
    <div className="w-full flex justify-between gap-2">
      <User
        avatarProps={{
          size: "md",
          radius: "sm",
          src: "http://img.gyyxcdn.cn/qibao/Images/itemImages/6001.jpg",
        }}
        description={`@${data.account?.replace("110001", "")}`}
        name={data.roleName}
      />
      <div className="flex flex-col items-end">
        <span className="text-xs leading-6 text-default-500">
          {data.roleName}
        </span>
        <Chip
          color={data.status === 1 ? "primary" : "danger"}
          size="sm"
          variant="dot"
          className="border-none p-0 h-4"
        >
          {data.status === 1 ? "在线" : "离线"}
        </Chip>
      </div>
    </div>
  );
};

export default function Home() {
  const [values, setValues] = React.useState<React.Key[]>([]);
  const [searchName, setSearchName] = React.useState("");

  const debouncedSearch = debounce(
    (query: string) => setSearchName(query),
    1000
  );

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["roles", searchName],
    queryFn: () =>
      axiosGet<API.UserListItem[]>("/api/roles", {
        roleName: searchName,
      }),
    placeholderData: {
      success: true,
      data: [],
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setValues([]);
  }, [data]);

  const currentSelected = data?.data?.filter((item) =>
    [...values].includes(item.gid)
  );

  const onLineNumber =
    data?.data.filter((item) => item.status === 1).length || 0;

  const renderContent = () => {
    if (isLoading || isFetching) {
      return (
        <div className="h-full flex justify-center items-center">
          <Spin />
        </div>
      );
    }
    return (
      <Listbox
        items={data?.data || []}
        label="Assigned to"
        selectionMode="single"
        emptyContent={<Empty description="请尝试查询~" />}
        selectedKeys={values as unknown as Set<string>}
        onSelectionChange={(keys) => {
          setValues([...keys] as React.Key[]);
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <Card className="flex flex-col h-[calc(100vh-88px)] gap-2">
        <CardHeader className="flex gap-2">
          <Input
            startContent={<Icon icon="ion:search-outline" width={18} />}
            placeholder="输入角色名进行筛选"
            size="sm"
            onChange={(evt) => debouncedSearch(evt.target.value)}
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
                <Chip key={item.gid} size="sm" className="border-none mx-2 h-4">
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
            <MailSend gids={values as string[]} />
          </Tab>
          <Tab title="首饰发送" key="jewelry">
            该功能暂未开放，敬请期待
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
