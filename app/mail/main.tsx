"use client";

import { RoleCard } from "@/components";
import { Button, Code, Input, Switch, Textarea } from "@nextui-org/react";

export const MailMain = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <RoleCard />
      </div>
      <div>
        <div>模板添加</div>
      </div>
      <div className="flex flex-col gap-4">
        <Input label="邮件标题" />
        <Input label="附加标题" />
        <Textarea label="当前发送信息" />
        <Textarea label="当前发送信息预览" isDisabled />
        <Switch defaultSelected>保存为模板</Switch>
        <Input label="模板名称" placeholder="当填写该" />
        <Button color="primary" className="w-full">
          确认发送
        </Button>
      </div>
    </div>
  );
};
