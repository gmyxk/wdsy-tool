import { FileSystemFactory } from "@/lib/file";
import { create } from "zustand";

type EtcFileState = {
  fileSystemFactory: FileSystemFactory | null;
};

type EtcFileActions = {
  setFileSystemFactory: (payload: FileSystemFactory) => void;
};

export const useEtcFileStore = create<EtcFileState & EtcFileActions>((set) => {
  return {
    fileSystemFactory: null,
    setFileSystemFactory: (payload) => {
      set({
        fileSystemFactory: payload,
      });
    },
  };
});
