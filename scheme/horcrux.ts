import { z } from 'zod';

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
