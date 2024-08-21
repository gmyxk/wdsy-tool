declare namespace API {
  interface UserListQueryParams {
    roleName?: string;
  }

  interface UserListItem {
    /** 角色账号 */
    account: string;
    /**
     * 门派
     * 分别对应金木水火土
     */
    clazz: "1" | "2" | "3" | "4" | "5";
    /** 角色名称 */
    roleName: string;
    /**
     * 角色性别
     * 0: 女
     * 1: 男
     */
    gender: 0 | 1;
    /** 角色在线状态 */
    status: 0 | 1;
    /** 角色等级 */
    level: number;
    /** 角色道行 */
    ability: number;
    /** 角色 ID */
    gid: string;
    /** 上次登录时间 */
    lastLoginTime: string;
    /** 金元宝数量 */
    gold: number;
    /** 注册时间 */
    createTime: string;
  }

  type UserDataContent = any;

  interface LoginDataContent {
    chars: string[];
  }
}

declare namespace DBData {
  interface RowDataPacket {
    constructor: {
      name: "RowDataPacket";
    };
    [column: string]: any;
    [column: number]: any;
  }

  interface LoginDataTable extends RowDataPacket {
    name: string;
    content: string;
  }

  interface LoginDataContent {
    chars: string[];
  }

  interface GidInfoTable extends RowDataPacket {
    gid: string;
    name: string;
    content: string;
  }

  interface DataRuntimeContent {
    create_time: string;
    active_char: string;
    startup_id: number;
    game_server: string;
    locked_gid: string;
    time: number;
    user_cache_uid: string;
  }
}
