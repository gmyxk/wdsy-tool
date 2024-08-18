"use client";

import { Button } from "@nextui-org/react";

export const EtcEditorMain = () => {
  const openFolder = async () => {
    const res = await window.showDirectoryPicker();

    console.log(res);
  };
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
