"use client";

import { useEtcFileStore } from "@/store";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";

const EtcEditorPage = () => {
  const etcFileStore = useEtcFileStore((state) => state);

  const openFolder = async () => {
    const res = await window.showDirectoryPicker();
    etcFileStore.setFileSystemDirectoryHandle(res);
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
          请先选择文件夹
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Button
        color="primary"
        onClick={() => {
          openFolder();
        }}
      >
        选择文件夹
      </Button>
    </div>
  );
};

export default EtcEditorPage;
