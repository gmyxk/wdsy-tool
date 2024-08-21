"use client";

import { CodeBlock } from "@/components";
import { useEtcFileStore } from "@/store";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { CustomGiftPackageForm } from "./input-data";

type Handle = FileSystemFileHandle | FileSystemDirectoryHandleExt;

type FileSystemDirectoryHandleExt = FileSystemDirectoryHandle & {
  children: Handle[];
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

    const init = async () => {
      if (!fileSystemFactory) {
        return;
      }
      try {
        const festival_gift_item = await fileSystemFactory.readFileTxtByPath(
          "/etc.pak/festival_gift_item.list",
          "gb2312"
        );
        const basic_festival_gift = await fileSystemFactory.readFileTxtByPath(
          "/etc.pak/basic_festival_gift.list",
          "gb2312"
        );
        const itemInfo = await fileSystemFactory.readFileTxtByPath(
          "/res/cfg/ItemInfo.luac"
        );

        setTextObj({
          festival_gift_item,
          basic_festival_gift,
          itemInfo,
        });
      } catch (error) {
        console.error(error);
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
      <CustomGiftPackageForm />
      <div className="my-2">文件预览</div>
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
