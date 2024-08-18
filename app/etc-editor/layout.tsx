"use client";

import { ScrollShadow } from "@nextui-org/react";
import { Sidebar } from "./sidebar";
import { items } from "./sidebar-items";
import { useEtcFileStore } from "@/store";
import { cn } from "@/utils";

export default function EtcToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const etcFileStore = useEtcFileStore((state) => state);

  return (
    <div className="flex">
      <div
        className={cn(
          "w-72 h-[calc(100vh-100px)] border-r-small border-divider p-4",
          {
            hidden: !etcFileStore.fileSystemDirectoryHandle,
          }
        )}
      >
        <ScrollShadow className="h-full max-h-full">
          <Sidebar defaultSelectedKey="home" items={items} />
        </ScrollShadow>
      </div>
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
}
