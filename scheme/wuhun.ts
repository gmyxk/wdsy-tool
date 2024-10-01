import { z } from "zod";

const SendWuhunAttrItem = z.object({
  attribute: z.string(),
  value: z.number().int().gt(1),
})

export const SendWuhunItem = z.object({
  color: z.enum(['金色', '粉色', '蓝色']),
  attributes: SendWuhunAttrItem.array().length(3),
});

export type SendWuhunItem = z.infer<typeof SendWuhunItem>;

export const SendWuhunReq = z.object({
  gid: z.string(),
  wuhuns: SendWuhunItem.array().min(1)
})

export type SendWuhunReq = z.infer<typeof SendWuhunReq>