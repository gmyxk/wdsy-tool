declare namespace API {
  interface UserListQueryParams {
    roleName?: string;
  }

  interface GidItem {
    gid: string;
    name: string;
  }

  /**
   * 角色信息
   */
  interface RoleInfo {
    /** 角色账号 */
    account: string;
    /** 角色名称 */
    roleName: string;
    /**
     * 门派
     * 分别对应金木水火土
     */
    clazz: 1 | 2 | 3 | 4 | 5;

    /**
     * 角色性别
     * 2: 女
     * 1: 男
     */
    gender: 1 | 2;
    /** 角色在线状态 */
    status: 0 | 1;
    /** 角色等级 */
    level: number;
    /** 角色道行 */
    ability: number;
    /** 角色 ID */
    gid: string;
    /** 仙魔类型 4: 魔    3: 仙 */
    riseType?: 4 | 3 | 2;
    /** 元婴等级 */
    yuanBabyLevel?: number;
    /** 消费积分 */
    consumptions?: number;
    /** 人物数据原始 LPC 报文 */
    userDataContent: string;
    /** 上次登录时间 */
    // lastLoginTime: string;
    /** 金元宝数量 */
    // gold: number;
    /** 注册时间 */
    // createTime: string;
  }

  type RoleListItem = Pick<
    RoleInfo,
    | 'account'
    | 'roleName'
    | 'clazz'
    | 'gender'
    | 'status'
    | 'level'
    | 'ability'
    | 'gid'
  >;

  interface LoginDataContent {
    chars: string[];
  }

  /**
   * 区组信息
   */
  interface ZoneInfo {
    aaa: string;
    dist: string;
    ip: string;
  }
}

declare namespace DBData {
  interface LoginDataTable extends RowDataPacket {
    name: string;
    content: string;
  }

  interface GidInfoTable extends RowDataPacket {
    gid: string;
    name: string;
    content: string;
  }

  interface AaaTable extends RowDataPacket {
    aaa: string;
    dist: string;
    ip: string;
  }
}
