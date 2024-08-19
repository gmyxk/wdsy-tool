/**
 * 给.list 文件添加条目
 * @param items columns 的值
 * @param spaces columns 之间的间隔
 */
export const genListItemWithSeparator = (
  items: Array<string | number>,
  spaces = 1
) => {
  const spacesStr = " ".repeat(spaces);
  return items.join(`,${spacesStr}`);
};

/**
 * 给.list 文件添加新的一行
 */
export const addListItemEndByLineBreak = (
  originText: string,
  ...newLines: Array<string | number>
) => {
  const newLinesStr = newLines.join("\n");

  if (originText.endsWith("\n")) {
    return `${originText}${newLinesStr}`;
  }

  return `${originText}\n${newLinesStr}`;
};
