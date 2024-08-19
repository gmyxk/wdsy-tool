/**
 * 给.list 文件添加条目
 */
export const joinListItem = (items: Array<string | number>, spaces = 1) => {
  const spacesStr = " ".repeat(spaces);
  return items.join(`,${spacesStr}`);
};
