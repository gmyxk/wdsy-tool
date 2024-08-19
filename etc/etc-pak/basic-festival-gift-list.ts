import { FileListBase } from "@/etc";
import { FileSystemFactory } from "@/lib/file";

/**
 * 路径 /etc.pak/basic_festival_gift.list
 *
 * 文本示例
 *
 * #名称, #file_id, #attrib
 *
 * 经验中秋礼包, "festival_gift/jyzqlb", "ITEM_IN_NORMAL | ITEM_IN_COMBAT | ITEM_APPLY_ON_USER"
 */
export class FileBasicFestivalGiftList extends FileListBase {
  static path = "/etc.pak/basic_festival_gift.list";

  /**
   * 添加新条目
   * @param factory 文件类实例
   * @param data 礼包数据
   */
  static async addItem(
    factory: FileSystemFactory,
    data: { id: string; name: string }
  ) {
    await factory.writeFileTxtWithCallFn({
      path: this.path,
      callFn: (originalText) => {
        const newLine = this.genListItemWithSeparator(
          [
            data.name,
            `"festival_gift/${data.id}"`,
            '"ITEM_IN_NORMAL | ITEM_IN_COMBAT | ITEM_APPLY_ON_USER"',
          ],
          26
        );

        return this.addListItemEndByLineBreak(originalText, newLine);
      },
      encoding: this.encode,
    });
  }
}
