declare namespace API {
  /** 宠物信息 */
  interface PetInfo {
    /** 位置 id */
    positionId: number;
    /** 名称 */
    name: string;
    /** 等级 */
    level: number;
    /** 武学 */
    wuxue: number;
    /** 挂载信息 */
    payload: object;
  }

  interface GetPetListApiRes {
    pets: PetInfo[];
    content: string;
  }
} 