import iconv from "iconv-lite";

type FileSystemTreeHandle = FileSystemDirectoryHandle & {
  children: Array<FileSystemTreeHandle | FileSystemFileHandle>;
};

type Encoding = "utf-8" | "gb2312";

type VerifyFileTreeFn = (
  fileTree: FileSystemTreeHandle
) => Promise<Error | true>;

/**
 * 文件读写工具类
 */
export class FileSystemFactory {
  constructor(props?: { verifyFileTree?: VerifyFileTreeFn }) {
    this.verifyFileTree = props?.verifyFileTree;
  }

  private verifyFileTree?: VerifyFileTreeFn;

  /**
   * 原始的文件夹句柄
   */
  private directoryHandle: FileSystemDirectoryHandle | null = null;

  /**
   * 文件树对象，仅有一个树根
   */
  private fileTree: FileSystemTreeHandle | null = null;

  private processFileTree(
    handle: FileSystemFileHandle
  ): Promise<FileSystemFileHandle>;

  private processFileTree(
    handle: FileSystemDirectoryHandle
  ): Promise<FileSystemTreeHandle>;

  /**
   * 所有的 IO 操作都是异步的， 因为用 async await 递归出所有的文件
   * @param handle
   * @returns
   */
  private async processFileTree(
    handle: FileSystemFileHandle | FileSystemDirectoryHandle
  ) {
    // handle.kind -> directory: 文件夹; file: 文件
    if (handle.kind === "file") {
      return handle;
    }

    (handle as FileSystemTreeHandle).children = [];

    for await (const item of handle.entries()) {
      const subItem = await this.processFileTree(
        item[1] as FileSystemDirectoryHandle
      );
      (handle as FileSystemTreeHandle).children.push(subItem);
    }

    return handle as FileSystemTreeHandle;
  }

  /**
   * 获取校验权限
   * @param fileHandle
   * @param readWrite
   * @returns
   */
  private async verifyPermission(
    fileHandle: FileSystemDirectoryHandle,
    readWrite = true
  ) {
    const options: FileSystemHandlePermissionDescriptor = {};

    if (readWrite) {
      options.mode = "readwrite";
    }
    // Check if permission was already granted. If so, return true.
    if ((await fileHandle.queryPermission(options)) === "granted") {
      return true;
    }
    // Request permission. If the user grants permission, return true.
    if ((await fileHandle.requestPermission(options)) === "granted") {
      return true;
    }
    // The user didn't grant permission, so return false.
    return false;
  }

  /** 根文件夹名称 */
  public get directoryName() {
    return this.directoryHandle?.name;
  }

  /**
   * 初始化文件夹
   */
  public async init() {
    const directoryHandle = await window.showDirectoryPicker();

    await this.verifyPermission(directoryHandle, false);

    const fileTree = await this.processFileTree(directoryHandle);

    if (this.verifyFileTree) {
      const vs = await this.verifyFileTree(fileTree);

      if (vs instanceof Error) {
        throw vs;
      }
    }

    this.directoryHandle = directoryHandle;
    this.fileTree = fileTree;
  }

  /**
   * 通过路径获取文件句柄
   * @param path 例如 /foo/bar/demo.txt
   */
  public async getFileHandle(path: string) {
    // 去掉首位 /
    if (path.startsWith("/")) {
      path = path.substring(1);
    }

    if (!this.fileTree) {
      throw new Error("文件根路径不存在");
    }

    const names = path.split("/");

    let handle: FileSystemFileHandle | null = null;

    let children = this.fileTree.children;

    names.forEach((name, index) => {
      const cur = children.find((item) => item.name === name);

      if ((cur as FileSystemTreeHandle)?.children) {
        children = (cur as FileSystemTreeHandle).children;
      }

      if (index === names.length - 1 && cur?.kind === "file") {
        handle = cur;
      }
    });

    if (!handle) {
      throw new Error("文件不存在");
    }

    return handle as FileSystemFileHandle;
  }

  /**
   * 获取文件文本内容
   * @param path 例如 /foo/bar/demo.txt
   * @param encoding 例如 "utf-8"
   */
  static async readFilehandleText(
    handle: FileSystemFileHandle,
    encoding: Encoding = "utf-8"
  ) {
    const file = await handle.getFile();
    const arrayBuffer = await file.arrayBuffer();
    const decoder = new TextDecoder(encoding);
    const text = decoder.decode(arrayBuffer);

    return text;
  }

  /**
   * 写入文件文本内容
   * @param handle 文件句柄
   * @param text 文本内容
   * @param encoding 例如 "utf-8"
   */
  static async writeFilehandleText(
    handle: FileSystemFileHandle,
    text: string,
    options?: {
      encoding?: Encoding;
    }
  ) {
    const { encoding = "utf-8" } = options || {};

    const encodedContent = iconv.encode(text, encoding);

    const writableStream = await handle.createWritable();

    await writableStream.write(encodedContent);
    await writableStream.close();
  }

  /**
   * 通过路径获取文件文本内容
   * @param path 例如 /foo/bar/demo.txt
   * @param encoding 例如 "utf-8"
   */
  public async readFileTxtByPath(path: string, encoding: Encoding = "utf-8") {
    const handle = await this.getFileHandle(path);
    return FileSystemFactory.readFilehandleText(handle, encoding);
  }

  /**
   * 写入文件 - 带处理回调方法
   * @param path 文件路径
   * @param callFn 字符串处理回调
   * @param options 配置项
   */
  public async writeFileTxtWithCallFn(options: {
    path: string;
    encoding?: Encoding;
    callFn: (originText: string) => string | Promise<string>;
  }) {
    const { path, callFn, encoding } = options;
    const handle = await this.getFileHandle(path);

    const originalText = await FileSystemFactory.readFilehandleText(
      handle,
      encoding
    );

    let newText = originalText;

    const textOrPromise = callFn(originalText);

    if (textOrPromise instanceof Promise) {
      newText = await textOrPromise;
    } else {
      newText = textOrPromise;
    }

    await FileSystemFactory.writeFilehandleText(handle, newText, options);
  }
}
