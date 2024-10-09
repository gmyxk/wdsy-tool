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
  riseType: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
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

export const UnifiedModifyDaoInfo = z.object({
  rangeConfig: z.object({
    /** 开始等级 */
    start: z.number().int().min(1).max(9999),
    /** 结束等级 */
    end: z.number().int().min(1).max(9999),
    /** 年 */
    dao: z.number().int().min(1),
  }).array().min(1),
  /** 强制修改道行，当前道行超过目标道行时也会被修改成目标道行 */
  force: z.boolean().optional(),
})

export type UnifiedModifyDaoInfo = z.infer<typeof UnifiedModifyDaoInfo>;

export const UnifiedModifyDaoInfoApiReq = z.object({
  gid: z.string(),
  payload: UnifiedModifyDaoInfo
})

export type UnifiedModifyDaoInfoApiReq = z.infer<typeof UnifiedModifyDaoInfoApiReq>
