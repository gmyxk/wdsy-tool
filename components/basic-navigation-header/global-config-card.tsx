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

enum NotificationTabs {
  All = "all",
  Unread = "unread",
  Archive = "archive",
}

export default function Component(props: CardProps) {
  const [activeTab, setActiveTab] = React.useState<NotificationTabs>(
    NotificationTabs.All
  );

  const globlaConfig = useGloblaConfigStore((s) => s);

  const [currentConfig, setCurrentConfig] = React.useState(globlaConfig);

  React.useEffect(() => {
    setCurrentConfig(globlaConfig);
  }, [globlaConfig]);

  const { storgeConfig } = currentConfig;

  return (
    <Card className="w-full max-w-[420px]" {...props}>
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
      <CardBody className="w-full gap-0 p-0">
        <ScrollShadow className="h-[500px] w-full">
          <div className="p-6 w-[350px] flex flex-col gap-4">
            <Input
              label="数据库连接地址"
              className="m-x-8"
              value={storgeConfig.host}
              onChange={(evt) => {
                setCurrentConfig(
                  produce((draft) => {
                    draft.storgeConfig.host = evt.target.value;
                  })
                );
              }}
            />
            <Input
              label="端口号"
              className="m-x-8"
              value={storgeConfig.port}
              onChange={(evt) => {
                setCurrentConfig(
                  produce((draft) => {
                    draft.storgeConfig.port = evt.target.value;
                  })
                );
              }}
            />
            <Input
              label="数据库密码"
              className="m-x-8"
              type="password"
              value={storgeConfig.password}
              onChange={(evt) => {
                setCurrentConfig(
                  produce((draft) => {
                    draft.storgeConfig.password = evt.target.value;
                  })
                );
              }}
            />
          </div>
        </ScrollShadow>
      </CardBody>
      <CardFooter className="justify-end gap-2 px-4">
        <Button
          variant="flat"
          onClick={() => {
            globlaConfig.setGlobalConfig(currentConfig);
          }}
        >
          保存设置
        </Button>
      </CardFooter>
    </Card>
  );
}
