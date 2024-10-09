import { wdApiFormat } from "@/lib/api";
import { EditPetInfoApiReq } from "@/scheme";
import { deletePetInfoService, getRoleCarryPats, putPetInfoService } from "@/service";

export const GET = wdApiFormat<object, { gid: string }>(async ({ pools, params }) => {
  return getRoleCarryPats(pools.useDdb(), params)
});

export const PUT = wdApiFormat<EditPetInfoApiReq>(async ({ pools, body }) => {
  return putPetInfoService(pools.useDdb(), body)
})

export const DELETE = wdApiFormat<{
  gid: string;
  positionId: number;
}>(async ({ pools, body }) => {
  return deletePetInfoService(pools.useDdb(), body)
})