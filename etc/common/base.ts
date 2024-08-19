export class FileBase {
  /**
   * 清除字符串结尾的所有空格和换行符
   * @param text
   */
  static removeEndSpaceBreak(text: string) {
    return text.replace(/\s+$/g, "");
  }
}
