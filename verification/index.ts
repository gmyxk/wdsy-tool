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
