declare namespace API {
  type ResponsTpl<T = any> = {
    success: boolean;
    message?: string;
    data: T;
    total?: number;
  };
}

declare namespace DBData {
  interface RowDataPacket {
    constructor: {
      name: "RowDataPacket";
    };
    [column: string]: any;
    [column: number]: any;
  }
}
