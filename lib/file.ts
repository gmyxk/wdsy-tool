import iconv from "iconv-lite";

type Handle = FileSystemFileHandle | FileSystemDirectoryHandleExt;

type FileSystemDirectoryHandleExt = FileSystemDirectoryHandle & {
  children: Handle[];
};

export class FilesystemFactory {
  private directoryHandle: FileSystemDirectoryHandle;

  private fileTree: FileSystemDirectoryHandleExt[] = [];

  constructor(directoryHandle: FileSystemDirectoryHandle) {
    this.directoryHandle = directoryHandle;
  }

  public async init() {
    this.fileTree = [
      await this.processFileTree(
        this.directoryHandle as FileSystemDirectoryHandleExt
      ),
    ];
  }

  /**
   * 通过路径读取文件
   * @param path 例如 /foo/bar/demo.txt
   */
  public async readFileTxt(path: string, encoding = "utf-8") {
    // 去掉首位 /
    path = path.replace(/^\//, "");
    const names = path.split("/");

    let handle: FileSystemFileHandle | null = null;

    let children = this.fileTree[0].children;

    names.forEach((name, index) => {
      const cur = children.find((item) => item.name === name);

      if ((cur as FileSystemDirectoryHandleExt)?.children) {
        children = (cur as FileSystemDirectoryHandleExt).children;
      }

      if (index === names.length - 1 && cur?.kind === "file") {
        handle = cur;
      }
    });

    if (!handle) {
      throw new Error("文件不存在");
    }

    const file = await (handle as FileSystemFileHandle).getFile();
    const arrayBuffer = await file.arrayBuffer();
    const decoder = new TextDecoder(encoding);
    const text = decoder.decode(arrayBuffer);

    return text;
  }

  private processFileTree(
    handle: FileSystemFileHandle
  ): Promise<FileSystemFileHandle>;

  private processFileTree(
    handle: FileSystemDirectoryHandleExt
  ): Promise<FileSystemDirectoryHandleExt>;

  /**
   * 所有的 IO 操作都是异步的， 因为用 async await 递归出所有的文件
   * @param handle
   * @returns
   */
  private async processFileTree(handle: Handle) {
    // handle.kind -> directory: 文件夹; file: 文件
    if (handle.kind === "file") {
      return handle;
    }

    handle.children = [];

    for await (const item of handle.entries()) {
      const subItem = await this.processFileTree(
        item[1] as FileSystemDirectoryHandleExt
      );
      handle.children.push(subItem);
    }

    return handle;
  }
}
