import { wdApiFormat } from "@/lib/api";
import { coverUserContainerService } from "@/service";

export const POST = wdApiFormat<{ content: string; gid: string }>(async ({ pools, body }) => {
  return coverUserContainerService(pools.useDdb(), body)
}) 