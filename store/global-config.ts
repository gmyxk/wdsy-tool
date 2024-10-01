import { GlobalConfig, GlobalDbConfig } from '@/scheme';
import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type GlobalConfigState = GlobalConfig;

type GlobalConfigAction = {
  setDbConfig: (config: GlobalDbConfig) => void;
};

export const useGloblaConfigStore = create(
  persist<GlobalConfigState & GlobalConfigAction>(
    (set) => {
      return {
        dbConfig: {
          connect: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
          },
          databases: [
            {
              name: '默认区组',
              sdk: '90sdk',
              adb: 'release_adb',
              ddb: 'release_ddb',
            },
          ],
          effectiveZone: '默认区组',
        },
        setDbConfig: (val) => {
          set(
            produce((draft) => {
              draft.dbConfig = val;
            })
          );
        },
      };
    },
    {
      name: 'GLOBAL_CONFIG',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
