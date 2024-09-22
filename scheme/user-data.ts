import { z } from 'zod';

export const EditConsumptionPointsApiReq = z.object({
  /** 角色 id合集 */
  gid: z.string(),
  /** 魂器物品信息 */
  points: z.number().int().min(1),
});

export type EditConsumptionPointsApiReq = z.infer<
  typeof EditConsumptionPointsApiReq
>;


