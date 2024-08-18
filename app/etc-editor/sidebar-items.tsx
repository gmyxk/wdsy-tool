import { type SidebarItem } from "./sidebar";
// import TeamAvatar from "./team-avatar";

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */

export const items: SidebarItem[] = [
  {
    key: "/etc-editor",
    href: "/etc-editor",
    title: "首页",
  },
  {
    key: "/etc-editor/custom-gift-package",
    href: "/etc-editor/custom-gift-package",
    title: "自定义礼包添加",
  },
  {
    key: "/etc-editor/mall-item",
    href: "/etc-editor/mall-item",
    title: "商城物品添加",
  },
];
