import { z } from "zod";

/**
 * 邮件发送接口参数
 */
export const SendMailApiReq = z.object({
  /** 角色 id合集 */
  gids: z.string().array(),
  /** misc的信息 */
  message: z.string().trim().default("祝道友身体健康, 万事如意！"),
  /** 邮件物品信息 */
  attachment: z
    .string()
    .trim()
    .regex(/^\#I.*\#I$/, "请检查输入的发送内容是否正确")
    .refine((value) => {
      const count = (value.match(/#I/g) || []).length;
      return count % 2 === 0;
    }, "请检查输入的发送内容是否正确"),
  /** 邮件标题 */
  title: z.string().trim(),
});

/**
 * 邮件发送接口参数
 */
export type SendMailApiReq = z.infer<typeof SendMailApiReq>;
