import { SendWuhunItem } from '@/scheme';
import { BaseContent } from './base';
import { produce } from 'immer';
import { DBEncoder } from '@/lib/encoding';

interface UserCarryDataContentParseItem {
  '47': 1;
  '55': "金色" | "粉色" | "蓝色";
  '232': number;
  '233': string;
  '240': 8;
  '373': 2213;
  /** 属性 */
  '376': [string, number][];
}

interface UserCarryDataContentParse {
  [k: string]: ['武魂精魄', UserCarryDataContentParseItem];
}

/**
 * store_data whjp content
 */
export class StoreDataWuhunContent extends BaseContent<UserCarryDataContentParse> {
  constructor(content: string) {
    super(content);
  }

  /**
   * 判断可用的包裹位置
   * @returns
   */
  private getBaggageEmptyPostion() {
    const carry = this.currentData;
    const keys = Object.keys(carry).map((i) => parseInt(i));

    const base = 5600;

    const min = base + 1;
    const max = base + 100;

    // 生成 min 到 max 的所有整数
    const allBaggagePositions = Array.from(
      { length: max - min + 1 },
      (_, i) => i + min
    );

    const missingPositions = allBaggagePositions.filter(
      (num) => !keys.includes(num)
    );

    return missingPositions;
  }

  /**
   * 添加武魂
   * @param wuhun 
   * @param position 
   */
  public addWuhunItem(wuhun: SendWuhunItem, position: number) {
    const data = this.currentData;

    const { color, attributes } = wuhun;

    this.setData(
      produce(data, (darft) => {
        darft[position] = [
          '武魂精魄',
          {
            '47': 1,
            '55': color,
            '232': position,
            '233': `:${DBEncoder.genRandomId()}:`,
            '240': 8,
            '373': 2213,
            /** 属性 */
            '376': attributes.map((item) => [item.attribute, item.value]),
          }
        ];
      })
    )
  }

  /**
   * 批量添加武魂
   * @param equip
   */
  public addEquipBatch(equip: SendWuhunItem[]) {
    const emptyPositions = this.getBaggageEmptyPostion();

    if (emptyPositions.length < equip.length) {
      throw new Error('仓库位置不足, 请清理后再操作');
    }

    for (let i = 0; i < equip.length; i++) {
      this.addWuhunItem(equip[i], emptyPositions[i]);
    }
  }
}
