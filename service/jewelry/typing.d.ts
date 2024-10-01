declare namespace API {
  /**
   * 携带物品信息
   */
  interface CarryItem {
    positionId: number;
    name: string;
    payload: any;
  }

  interface GetUserCarryDataRes {
    carryItems: CarryItem[];
    carryContent: string;
  }
}
