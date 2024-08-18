"use client";

import { CodeBlock } from "@/components";
import { FilesystemFactory } from "@/lib/file";
import { useEtcFileStore } from "@/store";
import { Tab, Tabs } from "@nextui-org/react";
import React, { use } from "react";

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

/**
 * 获取文件内容
 * @param handle
 * @param path 文件路径 例如 /foo/bar/demo.txt
 * @returns string
 */
const getFileContent = async (
  handle: FileSystemDirectoryHandle,
  path: string
) => {
  const fileHandle = await handle.getFileHandle(path, { create: false });
  const file = await fileHandle.getFile();
  const content = await file.text();
  return content;
};

export default function CustomGiftPackage() {
  const directoryHandle = useEtcFileStore(
    (state) => state.fileSystemDirectoryHandle
  );

  const [textObj, setTextObj] = React.useState({
    festival_gift_item: "",
    basic_festival_gift: "",
    itemInfo: "",
  });

  React.useEffect(() => {
    if (!directoryHandle) {
      return;
    }

    console.log("directoryHandle.name = ", directoryHandle.name);

    const init = async () => {
      if (!directoryHandle) {
        return;
      }
      try {
        const ins = new FilesystemFactory(directoryHandle);

        await ins.init();

        const festival_gift_item = await ins.readFileTxt(
          "/etc.pak/festival_gift_item.list",
          "gb2312"
        );
        const basic_festival_gift = await ins.readFileTxt(
          "/etc.pak/basic_festival_gift.list",
          "gb2312"
        );
        const itemInfo = await ins.readFileTxt("/res/cfg/ItemInfo.luac");

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

  return (
    <div>
      <div className="mb-2">文件预览</div>
      <Tabs>
        <Tab title="festival_gift_item.list" key="festival_gift_item.list">
          <CodeBlock size="sm" code={textObj.festival_gift_item} />
        </Tab>
        <Tab title="basic_festival_gift.list" key="basic_festival_gift.list">
          <CodeBlock size="sm" code={textObj.basic_festival_gift} />
        </Tab>
        <Tab title="ItemInfo.luac" key="ItemInfo.luac">
          <CodeBlock size="sm" code={textObj.itemInfo} />
        </Tab>
      </Tabs>
    </div>
  );
}
