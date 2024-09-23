import { z } from 'zod';

/**
 * 人物信息编辑
 */
export const EditRoleInfoPayload = z.object({
  /** 等级 */
  level: z.number().int().min(1).max(9999).optional(),
  /** 道行 */
  ability: z.number().int().min(1).optional(),
  /** 性别 */
  gender: z.union([z.literal(1), z.literal(2)]).optional(),
  /** 门派 */
  clazz: z
    .union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ])
    .optional(),
  /** 仙魔类型 4: 魔    3: 仙 */
  riseType: z.union([z.literal(3), z.literal(4)]).optional(),
  /** 元婴等级 */
  yuanBabyLevel: z.number().int().min(1).max(999).optional(),
  /** 消费积分 */
  consumptions: z.number().int().min(0).optional(),
});

export type EditRoleInfoPayload = z.infer<typeof EditRoleInfoPayload>;

export const EditRoleInfoApiReq = z.object({
  /** 角色 id合集 */
  gid: z.string(),
  /** 需要更新的角色信息 */
  payload: EditRoleInfoPayload,
});

export type EditRoleInfoApiReq = z.infer<typeof EditRoleInfoApiReq>;
