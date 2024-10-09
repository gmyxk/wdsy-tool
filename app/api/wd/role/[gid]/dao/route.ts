import { wdApiFormat } from "@/lib/api";
import { UnifiedModifyDaoInfo } from "@/scheme";
import { editRoleDaoInfoService } from "@/service";

export const PUT = wdApiFormat<{
  gid: string;
  payload: UnifiedModifyDaoInfo
}>(async ({ pools, body }) => {
  return editRoleDaoInfoService(pools.useDdb(), body)
}) 