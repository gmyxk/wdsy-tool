import { FileLuacBase } from "@/etc";
import { FileSystemFactory } from "@/lib/file";

const tpl = (data: EtcFileEditor.CustomGiftPackageParam) =>
  `
  ["${data.name}"] = {
    icon = ${data.iconId},
    unit = "个",
    rescourse = {
      "自定义礼包"
    },
    descript = "${data.desc}",
    double_type = 0
  }
`;

/**
 * 路径 /res/cfg/ItemInfo.luac
 * 
 * 文件预览
 * 
 * ```luac
 * return {
    ["继承消耗补偿礼包"] = {
      icon = 9156,
      use_level = 80,
      level_tip = "角色等级达到#R80级#n后方可使用本道具。",
      try_level_tip = "适用等级：角色大于等于%d级",
      unit = "个",
      rescourse = {"自定义礼包"},
      descript = "打开可获得1亿银元宝。",
      double_type = 0
    },
    ["齐天盖世"] = {
      icon = 9566,
      unit = "套",
      gender = 1,
      descript = "钟情一人动心魂，倾心所爱情意浓。女子使用后将会身着华美的服饰",
      double_type = 2,
      rescourse = {
        "缘定三生活动"
      },
      item_class = ITEM_CLASS.FASHION,
      relation_fashion = "齐天风华",
      color = "金色"
    }
  }
 * ```
 */
export class FileItemInfoLuac extends FileLuacBase {
  static path = "/res/cfg/ItemInfo.luac" as const;

  static async addItem(
    factory: FileSystemFactory,
    data: EtcFileEditor.CustomGiftPackageParam
  ) {
    await factory.writeFileTxtWithCallFn({
      path: this.path,
      callFn: (originalText) => {
        const lastIndex = originalText.lastIndexOf("}");
        const start = originalText.substring(0, lastIndex);
        const secondPart = originalText.substring(lastIndex);
        const insertContent = "," + tpl(data);

        return this.removeEndSpaceBreak(start) + insertContent + secondPart;
      },
      encoding: this.encode,
    });
  }
}
