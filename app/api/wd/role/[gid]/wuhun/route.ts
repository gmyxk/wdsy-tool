import { wdApiFormat } from "@/lib/api";
import { SendWuhunReq } from "@/scheme";
import { addWuhunService, coverStoreDataContentWhjpService, queryWuhunStoreInfoService } from "@/service";

export const GET = wdApiFormat<object, { gid: string }>(async ({ pools, params }) => {
  return queryWuhunStoreInfoService(pools.useDdb(), {
    gid: params.gid
  })
})

export const PUT = wdApiFormat<SendWuhunReq>(async ({ pools, body }) => {
  return addWuhunService(pools.useDdb(), body)
})

export const POST = wdApiFormat<{ gid: string; content: string }>(async ({ pools, body }) => {
  return coverStoreDataContentWhjpService(pools.useDdb(), body)
})