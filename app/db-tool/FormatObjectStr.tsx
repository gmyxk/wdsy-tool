"use client";
import { BaseContent } from "@/content";
import { Input, Button, Textarea } from "@nextui-org/react";
import { message } from "antd";
import React from "react";

/**
 * 格式化数据库中的大对象
 */
export const FormatObjectStr = () => {
  const [value, setValue] = React.useState("");

  const [formatValue, setFormatValue] = React.useState("");

  const [jsonValue, setJsonVaule] = React.useState("");

  const [error, setError] = React.useState<Error>();

  const handleChange = (val: string) => {
    setError(undefined);
    if (val.trim() === "") {
      setFormatValue("");
      setJsonVaule("");
      return;
    }
    setFormatValue(BaseContent.deformat(val));

    try {
      const tar = BaseContent.parse(val);
      setJsonVaule(JSON.stringify(tar, null, 2));
    } catch (err) {
      setJsonVaule("Error");
      setError(err as Error);
      console.error(err);
    }
  };

  const copy = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      message.success("复制成功");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <Input
          type="email"
          label="输入原始报文"
          value={value}
          onChange={(evt) => {
            setValue(evt.target.value);
            handleChange(evt.target.value);
          }}
          onClear={() => {
            setValue("");
            handleChange("");
          }}
          isClearable
        />
        <Button
          className="h-14"
          onClick={() => {
            handleChange(value);
          }}
        >
          重新生成
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Textarea
          label="格式化后的原始报文"
          classNames={{
            innerWrapper: "max-h-[calc(100vh-330px)] overflow-y-auto",
          }}
          placeholder={`请在上方输入格式为：\n\n (["rank":(["first_rank":([]),"act_end_time":1740911400,"data":([1:(["score":4000368,"exp":368,"percent":4829,"level":4,"now":1722820259,"name":"天尊","gid":"66A7A21EB634730001F9",]),0:(["exp":410,"score":4000410,"percent":5380,"name":"天亦","now":1722529548,"level":4,"gid":"66A7DE38A9D7DA0001F9",]),]),]),]) \n\n 的报文，输入后可根据原始报文自动生成`}
          value={formatValue}
          maxRows={10000}
        />
        <Textarea
          label="JSON 报文"
          classNames={{
            innerWrapper: "max-h-[calc(100vh-330px)] overflow-y-auto",
          }}
          placeholder={`请在上方输入格式为：\n\n (["rank":(["first_rank":([]),"act_end_time":1740911400,"data":([1:(["score":4000368,"exp":368,"percent":4829,"level":4,"now":1722820259,"name":"天尊","gid":"66A7A21EB634730001F9",]),0:(["exp":410,"score":4000410,"percent":5380,"name":"天亦","now":1722529548,"level":4,"gid":"66A7DE38A9D7DA0001F9",]),]),]),]) \n\n 的报文，输入后可根据原始报文自动生成`}
          value={jsonValue}
          onChange={(evt) => setJsonVaule(evt.target.value)}
          maxRows={10000}
          isInvalid={!!error}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <Button
          color="primary"
          isDisabled={!formatValue}
          className="mt-4 w-full"
          onClick={() => {
            copy(BaseContent.enformat(formatValue));
          }}
        >
          还原为原始报文格式并复制到粘贴板
        </Button>
        <Button
          color="primary"
          isDisabled={!formatValue}
          className="mt-4 w-full"
          onClick={() => {
            copy(BaseContent.stringify(JSON.parse(jsonValue)));
          }}
        >
          将 Json 转换为 content 并复制到粘贴板
        </Button>
      </div>
    </div>
  );
};
