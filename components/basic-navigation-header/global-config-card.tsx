"use client";

import type { CardProps } from "@nextui-org/react";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  ScrollShadow,
  CardFooter,
  Input,
} from "@nextui-org/react";
import { useGloblaConfigStore } from "@/store";
import { produce } from "immer";
import { SubmitHandler, useForm } from "react-hook-form";

enum NotificationTabs {
  All = "all",
  Unread = "unread",
  Archive = "archive",
}

export default function Component(
  props: CardProps & {
    onSaved?: () => void;
  }
) {
  const [activeTab, setActiveTab] = React.useState<NotificationTabs>(
    NotificationTabs.All
  );

  const { onSaved, ...propsRest } = props;

  const globlaConfig = useGloblaConfigStore((s) => s);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: globlaConfig.storgeConfig,
  });

  const onSubmit: SubmitHandler<typeof globlaConfig.storgeConfig> = (data) => {
    globlaConfig.setGlobalConfig({
      storgeConfig: data,
    });
    onSaved?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-[420px]" {...propsRest}>
        <CardHeader className="flex flex-col px-0 pb-0">
          <div className="flex w-full items-center justify-between px-5 py-2">
            <div className="inline-flex items-center gap-1">
              <h4 className="inline-block align-middle text-large font-medium">
                全局设置
              </h4>
            </div>
          </div>
          <Tabs
            aria-label="Notifications"
            classNames={{
              base: "w-full",
              tabList:
                "gap-6 px-6 py-0 w-full relative rounded-none border-b border-divider",
              cursor: "w-full",
              tab: "max-w-fit px-2 h-12",
            }}
            color="primary"
            selectedKey={activeTab}
            variant="underlined"
            onSelectionChange={(selected) =>
              setActiveTab(selected as NotificationTabs)
            }
          >
            <Tab key="store" title="数据库" />
          </Tabs>
        </CardHeader>
        <CardBody className="w-full">
          <ScrollShadow className="h-[500px] w-full">
            <div className="p-4 w-[350px] flex flex-col gap-4">
              <Input
                label="数据库连接地址"
                isInvalid={!!errors["host"]}
                errorMessage={errors["host"]?.message}
                {...register("host", { required: true })}
              />
              <Input
                label="端口号"
                isInvalid={!!errors["port"]}
                errorMessage={errors["port"]?.message}
                {...register("port", { required: true })}
              />
              <Input
                label="用户名"
                isInvalid={!!errors["user"]}
                errorMessage={errors["user"]?.message}
                {...register("user", { required: true })}
              />
              <Input
                label="数据库密码"
                className="m-x-8"
                type="password"
                isInvalid={!!errors["password"]}
                errorMessage={errors["password"]?.message}
                {...register("password", { required: true })}
              />
            </div>
          </ScrollShadow>
        </CardBody>
        <CardFooter className="justify-end gap-2 px-4">
          <Button type="submit" color="primary">
            保存设置
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
