import iconv from "iconv-lite";

export class DBEncoder {
  /**
   * 将 GB2312 转换为 UTF-16
   * @param text
   * @returns
   */
  static decodeGb2312(text: string) {
    return iconv.decode(Buffer.from(text, "binary"), "gb2312");
  }

  /**
   * 将 UTF-16 转换为 GB2312
   * @param text
   * @returns
   */
  static encodeToGb2312(text: string) {
    return iconv.encode(text, "gb2312").toString("binary");
  }
}
