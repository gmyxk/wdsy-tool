import { wdApiFormat } from '@/lib/api';
import {
  queryAnyInlineService,
} from '@/service';

export const GET = wdApiFormat(async ({ pools }) => {
  const hasOnline = await queryAnyInlineService(pools.useDdb())

  if (hasOnline) {
    throw new Error('当前有角色在线~ 请下线')
  }

  return {
    result: 0
  }
}) 
