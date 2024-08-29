import { z } from 'zod';

/**
 * 邮件发送接口参数
 */
export const SendMailApiReq = z.object({
  /** 角色 id合集 */
  gids: z.string().array(),
  /** misc的信息 */
  message: z.string().trim().default('祝道友身体健康, 万事如意！'),
  /** 邮件物品信息 */
  attachment: z
    .string()
    .trim()
    .regex(/^\#I.*\#I$/, '请检查输入的发送内容是否正确')
    .refine((value) => {
      const count = (value.match(/#I/g) || []).length;
      return count % 2 === 0;
    }, '请检查输入的发送内容是否正确'),
  /** 邮件标题 */
  title: z.string().trim(),
});

/**
 * 邮件发送接口参数
 */
export type SendMailApiReq = z.infer<typeof SendMailApiReq>;

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
 * 邮件发送接口参数
 */
export type SendJewelryApiReq = z.infer<typeof SendJewelryApiReq>;

const SendHorcruxAttrItem = z.object({
  lightAttrNum: z.number().int().gt(1).optional(),
  darkAttrNum: z.number().int().gt(1).optional(),
  lightAttribute: z.string(),
  lightAttributeValue: z.number().int().gt(1),
  darkAttribute: z.string(),
  darkAttributeValue: z.number().int().gt(1),
});

export const SendHorcruxItem = z.object({
  name: z.string().includes('魂器·'),
  level: z.number().int().min(1).max(169),
  skillLevel: z.number().int().min(1).max(5),
  chaosValue: z.number().int().min(1),
  lightProportion: z.number().int().min(1),
  attributes: SendHorcruxAttrItem.array().length(5),
});

export type SendHorcruxItem = z.infer<typeof SendHorcruxItem>;

export const SendHorcruxApiReq = z.object({
  /** 角色 id合集 */
  gid: z.string(),
  /** 魂器物品信息 */
  horcruxs: SendHorcruxItem.array().min(1),
});

export type SendHorcruxApiReq = z.infer<typeof SendHorcruxApiReq>;

export const EditConsumptionPointsApiReq = z.object({
  /** 角色 id合集 */
  gid: z.string(),
  /** 魂器物品信息 */
  points: z.number().int().min(1),
});

export type EditConsumptionPointsApiReq = z.infer<
  typeof EditConsumptionPointsApiReq
>;

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
