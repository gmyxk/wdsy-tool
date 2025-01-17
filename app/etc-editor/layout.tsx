"use client";

import { Button, ScrollShadow } from "@nextui-org/react";
import { Sidebar } from "./sidebar";
import { items } from "./sidebar-items";
import { useEtcFileStore } from "@/store";
import { cn } from "@/utils";
import React from "react";
import { Icon } from "@iconify/react";
import { FileSystemFactory } from "@/lib/file";
import { toast } from "react-toastify";

const NEED_EXIST_ITEM = [
  "etc.pak",
  "res",
  // "lib_gs32.pak",  "src"
];

export default function EtcToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const etcFileStore = useEtcFileStore((state) => state);

  const openFolder = async () => {
    try {
      const fileSystemFactory = new FileSystemFactory({
        verifyFileTree: async (fileTree) => {
          if (!fileTree.children || fileTree.children.length < 1) {
            return new Error("文件夹为空");
          }

          const dirNames = fileTree.children
            .filter((i) => i.kind === "directory")
            .map((i) => i.name);

          const notExistDir = NEED_EXIST_ITEM.find(
            (i) => !dirNames.includes(i)
          );

          if (notExistDir) {
            return new Error(`缺少 ${notExistDir} 文件夹`);
          }

          return true;
        },
      });

      await fileSystemFactory.init();

      etcFileStore.setFileSystemFactory(fileSystemFactory);
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  if (!etcFileStore.fileSystemFactory) {
    return (
      <div className="min-h-[calc(100dvh-100px)] flex flex-col gap-4 items-center justify-center">
        <Button
          size="lg"
          color="primary"
          onClick={() => {
            openFolder();
          }}
          startContent={<Icon width={32} icon="material-symbols:upload" />}
        >
          请先选择 Etc 文件夹
        </Button>
        <p className="">
          请确保您选择的文件夹中包含 {NEED_EXIST_ITEM.join("、")} 目录
        </p>
      </div>
    );
  }

  return (
    <div className="flex">
      <div
        className={cn(
          "w-60 h-[calc(100vh-88px)] border-r-small border-divider p-4 sticky top-14"
        )}
      >
        <ScrollShadow className="h-full max-h-full">
          <Sidebar items={items} />
        </ScrollShadow>
      </div>
      <div className="p-4 max-w-[calc(100%-240px)]">
        <h5 className="text-small font-medium text-default-500 mb-4">
          当前正在操作的目录 /{etcFileStore.fileSystemFactory.directoryName}
        </h5>
        <div>{children}</div>
      </div>
    </div>
  );
}
