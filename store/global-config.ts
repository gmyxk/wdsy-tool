import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

export type GlobalConfigState = {
  storgeConfig: {
    user: string;
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
          port: "3306",
          user: "root",
          password: "",
        },
        setGlobalConfig: (config: GlobalConfigState) => {
          set(config);
        },
      };
    },
    {
      name: "global-config",
      // getStorage: () => localStorage,
      getStorage: () => ({
        getItem: (name) => {
          return window.localStorage.getItem(name);
        },
        setItem(name, value) {
          if (value) {
            const obj = JSON.parse(value) as {
              state: GlobalConfigState;
            };

            const { host, port, user, password } = obj.state.storgeConfig;

            if (host && port && user && password) {
              Cookies.set("host", host, { expires: 7 });
              Cookies.set("port", port, { expires: 7 });
              Cookies.set("user", user, { expires: 7 });
              Cookies.set("password", password, { expires: 7 });
            }
          }
          return window.localStorage.setItem(name, value);
        },

        removeItem: window.localStorage.removeItem,
      }),
    }
  )
);
