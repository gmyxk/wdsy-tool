import { create } from "zustand";

type EtcFileState = {
  fileSystemDirectoryHandle: FileSystemDirectoryHandle | null;
};

type EtcFileActions = {
  setFileSystemDirectoryHandle: (payload: FileSystemDirectoryHandle) => void;
};

export const useEtcFileStore = create<EtcFileState & EtcFileActions>((set) => {
  return {
    fileSystemDirectoryHandle: null,
    setFileSystemDirectoryHandle: (payload: FileSystemDirectoryHandle) => {
      set({
        fileSystemDirectoryHandle: payload,
      });
    },
  };
});
