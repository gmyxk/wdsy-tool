import { create } from 'zustand';

export type RoleState = {
  selectedRoles: API.RoleListItem[];
  roles: API.RoleListItem[];
};

type RoleAction = {
  setSelectedRoles: (config: API.RoleListItem[]) => void;
  setRoles: (config: API.RoleListItem[]) => void;
};

export const useRoleStore = create<RoleState & RoleAction>((set) => {
  return {
    selectedRoles: [],
    roles: [],
    setSelectedRoles: (payload) => {
      set({
        selectedRoles: payload,
      });
    },
    setRoles: (payload) => {
      set({
        selectedRoles: [],
        roles: payload,
      });
    },
  };
});
