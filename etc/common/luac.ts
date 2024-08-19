import { FileBase } from "./base";

/**
 * luac 文件处理公共类
 */
export class FileLuacBase extends FileBase {
  static encode = "utf-8" as const;
}
