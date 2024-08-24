interface MailTpl {
  title: string;
  attach: string;
  deleteble?: true;
}

/**
 * 邮件模板预设
 */
export const MAIL_ATTACH_INIT: MailTpl[] = [
  {
    title: "人物经验 1000w",
    attach: "#I经验|人物经验#r10000000#I",
  },
  {
    title: "人物经验 5000w",
    attach: "#I经验|人物经验#r50000000#I",
  },
  {
    title: "人物经验 1e",
    attach: "#I经验|人物经验#r100000000#I",
  },
  {
    title: "金钱 20e",
    attach: "#I金钱|金钱#r2000000000#I",
  },
  {
    title: "金元宝 100w",
    attach: "#I金元宝|金元宝#r1000000#I",
  },
  {
    title: "金元宝 500w",
    attach: "#I金元宝|金元宝#r5000000#I",
  },
  {
    title: "金元宝 1000w",
    attach: "#I金元宝|金元宝#r10000000#I",
  },
  {
    title: "鬼仙-冥炎之灵",
    attach: "#I宠物|冥炎之灵(鬼仙)$1$3#I",
  },
  {
    title: "鬼仙-孟姑",
    attach: "#I宠物|孟姑(鬼仙)$1$3#I",
  },
];
