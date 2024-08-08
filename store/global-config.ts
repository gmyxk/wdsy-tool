import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GlobalConfigState = {
  storgeConfig: {
    host: string;
    port: string;
    password: string;
  };
};

type GlobalConfigAction = {
  setGlobalConfig: (config: GlobalConfigState) => void;
};

export const useGloblaConfigStore = create(
  persist<GlobalConfigState & GlobalConfigAction>(
    (set) => {
      return {
        storgeConfig: {
          host: "127.0.0.1",
          port: "8080",
          password: "",
        },
        setGlobalConfig: (config: GlobalConfigState) => {
          set(config);
        },
      };
    },
    {
      name: "global-config",
      getStorage: () => localStorage,
    }
  )
);
