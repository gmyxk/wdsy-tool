"use client";

import { CodeBlock } from "@/components";
import { FileSystemFactory } from "@/lib/file";
import { useEtcFileStore } from "@/store";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";

type Handle = FileSystemFileHandle | FileSystemDirectoryHandleExt;

type FileSystemDirectoryHandleExt = FileSystemDirectoryHandle & {
  children: Handle[];
};

/**
 * 所有的 IO 操作都是异步的， 因为用 async await 递归出所有的文件
 * @param handle
 * @returns
 */
const processFileTree = async (
  handle: FileSystemFileHandle | FileSystemDirectoryHandleExt
) => {
  // handle.kind -> directory: 文件夹; file: 文件
  if (handle.kind === "file") {
    return handle;
  }

  handle.children = [];

  for await (const item of handle.entries()) {
    const subItem = await processFileTree(
      item[1] as FileSystemDirectoryHandleExt
    );
    handle.children.push(subItem);
  }

  return handle;
};

export default function CustomGiftPackage() {
  const fileSystemFactory = useEtcFileStore((state) => state.fileSystemFactory);

  const [textObj, setTextObj] = React.useState({
    festival_gift_item: "",
    basic_festival_gift: "",
    itemInfo: "",
  });

  React.useEffect(() => {
    if (!fileSystemFactory) {
      return;
    }

    console.log("fileSystemFactory = ", fileSystemFactory);

    const init = async () => {
      if (!fileSystemFactory) {
        return;
      }
      try {
        const festival_gift_item = await fileSystemFactory.readFileTxt(
          "/etc.pak/festival_gift_item.list",
          "gb2312"
        );
        const basic_festival_gift = await fileSystemFactory.readFileTxt(
          "/etc.pak/basic_festival_gift.list",
          "gb2312"
        );
        const itemInfo = await fileSystemFactory.readFileTxt(
          "/res/cfg/ItemInfo.luac"
        );

        setTextObj({
          festival_gift_item,
          basic_festival_gift,
          itemInfo,
        });
      } catch (error) {
        console.error(error);
        console.log("没权限");
      }
    };

    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const codeProps = {
    size: "sm" as const,
    classNames: {
      pre: "max-h-[800px] overflow-y-auto",
    },
  };

  return (
    <div>
      <div className="mb-2">文件预览</div>
      <Tabs destroyInactiveTabPanel={false}>
        <Tab title="festival_gift_item.list" key="festival_gift_item.list">
          <CodeBlock code={textObj.festival_gift_item} {...codeProps} />
        </Tab>
        <Tab title="basic_festival_gift.list" key="basic_festival_gift.list">
          <CodeBlock code={textObj.basic_festival_gift} {...codeProps} />
        </Tab>
        <Tab title="ItemInfo.luac" key="ItemInfo.luac">
          <CodeBlock code={textObj.itemInfo} {...codeProps} />
        </Tab>
      </Tabs>
    </div>
  );
}
