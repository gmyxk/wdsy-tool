import { FileListBase } from "@/etc";
import { FileSystemFactory } from "@/lib/file";

/**
 * 路径 /etc.pak/festival_gift_item.list
 *
 * 文件示例
 *
 * #特殊物品名称, icon, 量词, 是否可叠加, 价格, 声望价格, 是否是任务物品, 操作类型, 是否记录apply_log, add_coin_log_action, alarm_item, 限制交易的奖励内容. 非限制交易的奖励内容
 *
 * 狗道礼包, 狗道礼包, 8001, 个, 0, 12345, 0, 0, "", 1, "", "", "#I金元宝|金元宝#r1000000000#I", "#I金元宝|金元宝#r1000000000#I"
 */
export class FileFestivalGiftItemList extends FileListBase {
  static path = "/etc.pak/festival_gift_item.list";

  /**
   * 添加新的一行
   * @param factory
   * @param data
   */
  static async addItem(
    factory: FileSystemFactory,
    data: {
      iconId: string;
      sellAmount: number;
      content: string;
      name: string;
    }
  ) {
    await factory.writeFileTxtWithCallFn({
      path: this.path,
      callFn: (originalText) => {
        const newLine = this.genListItemWithSeparator(
          [
            data.name,
            data.name,
            data.iconId,
            "个",
            0,
            data.sellAmount,
            0,
            0,
            '""',
            1,
            '""',
            '""',
            `"${data.content}"`,
            `"${data.content}"`,
          ],
          17
        );

        return this.addListItemEndByLineBreak(originalText, newLine);
      },
      encoding: this.encode,
    });
  }
}
