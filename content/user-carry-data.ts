import { DBEncoder } from '@/lib/encoding';
import { SendHorcruxItem, SendJewelryItem } from '@/verification';
import { produce } from 'immer';
import { BaseContent } from './base';

interface UserCarryDataContentParse {
  carry: {
    [k: string]: [string, object];
  };
}

/**
 * user_carry_data content
 */
export class UserCarryDataContent extends BaseContent<UserCarryDataContentParse> {
  constructor(content: string) {
    super(content);
  }

  /**
   * 判断可用的包裹位置
   * @returns
   */
  private getBaggageEmptyPostion() {
    const carry = this.currentData.carry;
    const keys = Object.keys(carry).map((i) => parseInt(i));

    const base = 40;

    const min = base + 1;
    const max = base + 125;

    // 生成 41 到 165 的所有整数
    const allBaggagePositions = Array.from(
      { length: max - min + 1 },
      (_, i) => i + min
    );

    const missingPositions = allBaggagePositions.filter(
      (num) => !keys.includes(num)
    );

    return missingPositions;
  }

  private addJewelry(jewelry: SendJewelryItem, position: number) {
    const data = this.currentData;

    const { level, type, name, attributes } = jewelry;

    let first: Record<string, number> = {};

    let second: Record<string, number> = {};

    attributes.forEach((item) => {
      if (first[item.attribute] !== undefined) {
        second[item.attribute] = item.value;
      } else {
        first[item.attribute] = item.value;
      }
    });

    this.setData(
      produce(data, (draft) => {
        draft.carry[position] = [
          name,
          {
            '47': 1,
            '49': 320000,
            '229': Object.keys(first).length > 0 ? first : undefined,
            '231': Object.keys(second).length > 0 ? second : undefined,
            '232': position,
            '233': `:${DBEncoder.genRandomId()}:`,
            '240': 8,
            '243': level,
            '244': type,
            '274': 1,
          },
        ];
      })
    );
  }

  /**
   * 批量添加首饰
   * @param jewelries
   */
  public addJewelryBatch(jewelries: SendJewelryItem[]) {
    const emptyPositions = this.getBaggageEmptyPostion();

    if (emptyPositions.length < jewelries.length) {
      throw new Error('包裹位置不足, 请清理后再操作');
    }

    for (let i = 0; i < jewelries.length; i++) {
      this.addJewelry(jewelries[i], emptyPositions[i]);
    }
  }

  private addHorcruxItem(horcrux: SendHorcruxItem, position: number) {
    const data = this.currentData;

    const {
      name,
      level,
      skillLevel,
      chaosValue,
      lightProportion,
      attributes,
    } = horcrux;

    const attrs: [number, number, string, number, string, number][] = [];

    attributes.forEach((item) => {
      attrs.push([
        item.lightAttrNum ?? chaosValue,
        item.darkAttrNum ?? lightProportion,
        item.lightAttribute,
        item.lightAttributeValue,
        item.darkAttribute,
        item.darkAttributeValue,
      ]);
    });

    this.setData(
      produce(data, (draft) => {
        draft.carry[position] = [
          name,
          {
            '47': 1,
            '49': 50000,
            '226': 0,
            '232': 41,
            '233': DBEncoder.genRandomId(),
            '240': 8,
            '243': level,
            '244': 8,
            '262': 0,
            '274': 1,
            '324': skillLevel,
            '325': attrs,
            '345': 3,
          },
        ];
      })
    );
  }

  /**
   * 批量添加魂器
   * @param horcruxs
   */
  public addHorcruxBatch(horcruxs: SendHorcruxItem[]) {
    const emptyPositions = this.getBaggageEmptyPostion();

    if (emptyPositions.length < horcruxs.length) {
      throw new Error('包裹位置不足, 请清理后再操作');
    }

    for (let i = 0; i < horcruxs.length; i++) {
      this.addHorcruxItem(horcruxs[i], emptyPositions[i]);
    }
  }
}
