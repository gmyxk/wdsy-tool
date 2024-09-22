import { DBEncoder } from '@/lib/encoding';
import { SendEquipmentItem, SendHorcruxItem, SendJewelryItem } from '@/scheme';
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

  /**
   * 添加首饰
   * @param jewelry
   * @param position
   */
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

  /**
   * 添加魂器
   * @param horcrux
   * @param position
   */
  private addHorcruxItem(horcrux: SendHorcruxItem, position: number) {
    const data = this.currentData;

    const { name, level, skillLevel, chaosValue, lightProportion, attributes } =
      horcrux;

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
            '233': `:${DBEncoder.genRandomId()}:`,
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

  /**
   * 添加装备
   * @param horcrux
   * @param position
   */
  private addEquipItem(equipment: SendEquipmentItem, position: number) {
    const data = this.currentData;

    const {
      name,
      level,
      type,
      transLevel,
      anis,
      blueAttrs,
      pinkAttrs,
      yellowAttrs,
      greenAttrs,
      greenDarkAttrs,
      transAttrs,
      resonanceAttr,
    } = equipment;

    const getAttrObj = (attrs: SendEquipmentItem['blueAttrs']) => {
      const obj = attrs.reduce(
        (acc, cur) => {
          acc[cur.attribute] = cur.value;
          return acc;
        },
        {} as Record<string, number>
      );
      return obj;
    };

    const transAttrObj = getAttrObj(transAttrs);

    if (transAttrObj && transAttrObj[3]) {
      transAttrObj[11] = Math.ceil(transAttrObj[3] / 1.334);
    }

    this.setData(
      produce(data, (draft) => {
        draft.carry[position] = [
          name,
          {
            // 固定为 1
            47: 1,
            // 固定为 3800000
            49: 3800000,
            // 改造等级
            54: transLevel,
            // 装备品阶
            55: '绿色',
            // 相性
            224: anis,
            // ？？？？？？
            226: 0,
            // 蓝属性
            229: getAttrObj(blueAttrs),
            // 粉属性
            231: getAttrObj(pinkAttrs),
            // 物品存储位置
            232: position,
            // id
            233: `:${DBEncoder.genRandomId()}:`,
            // 黄属性
            234: getAttrObj(yellowAttrs),
            // 暗属性
            235: getAttrObj(greenDarkAttrs),
            // 绿属性
            236: getAttrObj(greenAttrs),
            // 写死8
            240: 8,
            // 物品等级
            243: level,
            // 装备类型
            244: type,
            // 改造属性
            246: transAttrObj,
            // ？？？？？？
            250: 0,
            // ？？？？？？？
            262: 10000,
            // 固定为 1
            274: 1,
            // 共鸣属性
            282: resonanceAttr,
          },
        ];
      })
    );
  }

  /**
   * 批量添加装备
   * @param equip
   */
  public addEquipBatch(equip: SendEquipmentItem[]) {
    const emptyPositions = this.getBaggageEmptyPostion();

    if (emptyPositions.length < equip.length) {
      throw new Error('包裹位置不足, 请清理后再操作');
    }

    for (let i = 0; i < equip.length; i++) {
      this.addEquipItem(equip[i], emptyPositions[i]);
    }
  }

  /**
   * 清理背包
   * @param target
   */
  public clearBaggage(target: string[]) {
    let rangeArr: [number, number][] = []; 

    if (target.includes('PAK-00')) {
      rangeArr.push([1, 40]);
    }
    if (target.includes('PAK-01')) {
      rangeArr.push([41, 65]);
    }
    if (target.includes('PAK-02')) {
      rangeArr.push([66, 90]);
    }
    if (target.includes('PAK-03')) {
      rangeArr.push([91, 115]);
    }
    if (target.includes('PAK-04')) {
      rangeArr.push([116, 140]);
    }
    if (target.includes('PAK-05')) {
      rangeArr.push([141, 165]);
    }

    target.forEach((item) => {
      // 如果是标准的正整数
      if (/^\d+$/.test(item)) {
        rangeArr.push([Number(item), Number(item)]);
      }
    });

    rangeArr.forEach(([start, end]) => {
      for (let i = start; i <= end; i++) {
        delete this.currentData.carry[i];
      }
    });
  }

  public get carryitemList() {
    if (!this.currentData.carry) {
      return [];
    }

    const items = Object.entries(this.currentData.carry);

    return items.map(([positionId, [name, info]]) => {
      return {
        positionId: Number(positionId),
        name,
        payload: info,
      };
    });
  }
}
