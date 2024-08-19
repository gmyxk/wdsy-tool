/**
 * list 文件处理公共类
 */
export class FileListBase {
  static encode = "gb2312" as const;

  /**
   * 给.list 文件添加条目
   * @param items columns 的值
   * @param spaces columns 之间的间隔
   */
  static genListItemWithSeparator(items: Array<string | number>, spaces = 1) {
    const spacesStr = " ".repeat(spaces);
    return items.join(`,${spacesStr}`);
  }

  /**
   * 给.list 文件添加新的一行
   */
  static addListItemEndByLineBreak(
    originText: string,
    ...newLines: Array<string | number>
  ) {
    const newLinesStr = newLines.join("\n");

    if (originText.endsWith("\n")) {
      return `${originText}${newLinesStr}`;
    }

    return `${originText}\n${newLinesStr}`;
  }
}
