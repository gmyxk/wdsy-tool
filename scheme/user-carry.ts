import { z } from 'zod';

// ----------------- 装备 -------------------//

const SendEquipmentItemAttr = z.object({
  attribute: z.number().int(),
  value: z.number().int(),
});

/**
 * 装备发放
 */
export const SendEquipmentItem = z.object({
  /** 装备等级 */
  level: z.number().int().min(1).max(169),
  type: z
    .number()
    .int()
    .refine((val) => [1, 2, 3, 10].includes(val), {
      message: '数据不合法',
    }),
  name: z.string(),
  /** 套装相性 */
  anis: z.number().int().min(1).max(5),
  /** 改造等级 */
  transLevel: z.number().int().min(1).max(12),
  blueAttrs: SendEquipmentItemAttr.array().min(3),
  pinkAttrs: SendEquipmentItemAttr.array().min(1),
  yellowAttrs: SendEquipmentItemAttr.array().min(1),
  greenAttrs: SendEquipmentItemAttr.array().min(1),
  greenDarkAttrs: SendEquipmentItemAttr.array().min(1),
  transAttrs: SendEquipmentItemAttr.array().min(2),
  /** 共鸣属性 */
  resonanceAttr: z.string(),
});

export type SendEquipmentItem = z.infer<typeof SendEquipmentItem>;

export const SendEquipmentApiReq = z.object({
  /** 角色 id合集 */
  gid: z.string(),
  /** 装备物品信息 */
  equips: SendEquipmentItem.array().min(1),
});

export type SendEquipmentApiReq = z.infer<typeof SendEquipmentApiReq>;

// ----------------- 首饰 -------------------//

const SendJewelryItem = z.object({
  type: z.number(),
  level: z.number(),
  name: z.string(),
  bind: z.boolean().optional(),
  limitedHour: z.number().optional(),
  attributes: z
    .object({
      attribute: z.number().int().gt(1),
      value: z.number().int().gt(1),
    })
    .array()
    .min(1)
    .max(10)
    .refine(
      (val) => {
        const tar = val.find((i) => {
          let count = 0;
          val.forEach((j) => {
            if (i.attribute === j.attribute) {
              count++;
            }
          });
          return count > 2;
        });
        return tar ? false : true;
      },
      {
        message: '相同的属性不能超过两条',
      }
    ),
});

export type SendJewelryItem = z.infer<typeof SendJewelryItem>;

export const SendJewelryApiReq = z.object({
  /** 角色 id合集 */
  gid: z.string(),
  /** 首饰物品信息 */
  jewelrys: SendJewelryItem.array().min(1),
});

/**
 * 首饰发送接口参数
 */
export type SendJewelryApiReq = z.infer<typeof SendJewelryApiReq>;
