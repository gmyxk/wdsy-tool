"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ChipProps,
  Chip,
  User,
} from "@nextui-org/react";
import { UserTableSearchForm } from "./search";
// import { useTableColums, useTableSearch } from "@/hooks";
import { queryAllRolesApi } from "@/service";
import { Empty } from "antd";
import dayjs from "dayjs";
import { useTableColums } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

function pointsToYearsDaysPoints(points: number) {
  const pointsPerYear = 360 * 1000; // 每年等于 365,000 点
  const pointsPerDay = 1000; // 每天等于 1,000 点

  let result = "";

  // 计算年数
  const years = Math.floor(points / pointsPerYear);
  points %= pointsPerYear;

  if (years > 0) {
    result += `${years}年`;
  }

  // 计算天数
  const days = Math.floor(points / pointsPerDay);
  points %= pointsPerDay;

  if (days > 0) {
    result += `${days}天`;
  }

  // 剩余点数
  const remainingPoints = points;

  if (remainingPoints > 0 || result === "") {
    // 显示点数，或在 result 为空时显示 0点
    result += `${remainingPoints}点`;
  }

  return result;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  online: "primary",
  offline: "default",
};

export const RoleTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: queryAllRolesApi,
  });

  const { columns, renderCell } = useTableColums<API.UserListItem>([
    {
      title: "角色信息",
      key: "account",
      render(_, record) {
        const description = `${record.gid} / ${record.account}`;
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: "http://img.gyyxcdn.cn/qibao/Images/itemImages/6001.jpg",
            }}
            description={description}
            name={record.roleName}
          />
        );
      },
    },
    {
      title: "等级",
      key: "level",
      render(text) {
        return `${text}级`;
      },
    },
    {
      title: "道行",
      key: "ability",
      render(val) {
        return pointsToYearsDaysPoints(val);
      },
    },
    {
      title: "上次登录",
      key: "lastLoginTime",
      render(val) {
        return dayjs(val).toNow();
      },
    },
    {
      title: "角色状态",
      key: "status",
      render(text) {
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[text]}
            size="sm"
            variant="flat"
          >
            {text === "online" ? "在线" : "离线"}
          </Chip>
        );
      },
    },
    // {
    //   title: "操作",
    //   key: "actions",
    //   align: "center",
    //   render() {
    //     return (
    //       <div className="relative flex justify-end items-center gap-2">
    //         <Dropdown>
    //           <DropdownTrigger>
    //             <Button isIconOnly size="sm" variant="light">
    //               <Icon icon="bx:dots-vertical-rounded" width={22} />
    //             </Button>
    //           </DropdownTrigger>
    //           <DropdownMenu>
    //             <DropdownItem>发送邮件</DropdownItem>
    //             <DropdownItem>定制物品</DropdownItem>
    //             <DropdownItem>查看数据</DropdownItem>
    //             <DropdownItem>修改数据</DropdownItem>
    //           </DropdownMenu>
    //         </Dropdown>
    //       </div>
    //     );
    //   },
    // },
  ]);

  return (
    <Table
      isHeaderSticky
      topContent={
        <UserTableSearchForm
          onFinih={() => {
            // setParam(formValue);
          }}
        />
      }
      topContentPlacement="outside"
      classNames={{
        wrapper: "h-[calc(100vh-150px)]",
      }}
      selectedKeys={[]}
      selectionMode="single"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.align}
            allowsSorting={column.allowsSorting}
          >
            {column.title}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        emptyContent={<Empty description="请尝试新的查询~" className="mt-8" />}
        items={data?.data || []}
      >
        {(item) => (
          <TableRow
            key={item.gid}
            onContextMenu={(evt) => {
              evt.preventDefault();
              console.log(evt);
            }}
          >
            {(columnKey) => (
              <TableCell>{renderCell(columnKey as string, item)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
