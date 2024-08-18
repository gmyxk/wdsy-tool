"use client";

import { Button, ScrollShadow } from "@nextui-org/react";
import { Sidebar } from "./sidebar";
import { items } from "./sidebar-items";
import { useEtcFileStore } from "@/store";
import { cn } from "@/utils";
import React from "react";
import { Icon } from "@iconify/react";
import { get, set } from "idb-keyval";

async function verifyPermission(
  fileHandle: FileSystemDirectoryHandle,
  readWrite = true
) {
  const options: FileSystemHandlePermissionDescriptor = {};

  if (readWrite) {
    options.mode = "readwrite";
  }
  // Check if permission was already granted. If so, return true.
  if ((await fileHandle.queryPermission(options)) === "granted") {
    return true;
  }
  // Request permission. If the user grants permission, return true.
  if ((await fileHandle.requestPermission(options)) === "granted") {
    return true;
  }
  // The user didn't grant permission, so return false.
  return false;
}

export default function EtcToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const etcFileStore = useEtcFileStore((state) => state);

  // useEffect(() => {
  //   if (etcFileStore.fileSystemDirectoryHandle) {
  //     return;
  //   }
  //   const getEtcFileHandle = async () => {
  //     const res = await get("directory");

  //     if (res) {
  //       etcFileStore.setFileSystemDirectoryHandle(res);
  //       return;
  //     }
  //   };
  //   getEtcFileHandle();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const openFolder = async () => {
    try {
      const res = await window.showDirectoryPicker();
      etcFileStore.setFileSystemDirectoryHandle(res);
      await verifyPermission(res, false);
      set("directory", res);
    } catch (error) {
      console.error(error);
    }
  };

  if (!etcFileStore.fileSystemDirectoryHandle) {
    return (
      <div className="min-h-[calc(100dvh-100px)] flex items-center justify-center">
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
      </div>
    );
  }

  return (
    <div className="flex">
      <div
        className={cn(
          "w-72 h-[calc(100vh-100px)] border-r-small border-divider p-4"
        )}
      >
        <ScrollShadow className="h-full max-h-full">
          <Sidebar items={items} />
        </ScrollShadow>
      </div>
      <div className="flex-grow p-4 max-w-full">
        <h5 className="text-small font-medium text-default-500 mb-4">
          当前正在操作的目录 /{etcFileStore.fileSystemDirectoryHandle.name}
        </h5>
        <div>{children}</div>
      </div>
    </div>
  );
}
