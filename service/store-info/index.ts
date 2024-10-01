import { StoreDataWuhunContent } from '@/content';
import { DBEncoder } from '@/lib/encoding';
import { SendWuhunReq } from '@/scheme';
import { Pool } from 'mysql2/promise';
import { queryRoleInlineService } from '../account';

/**
 * 查询仓库信息
 * @param ddb
 * @param param
 * @returns
 */
export const queryStoreInfoService = async (
  ddb: Pool,
  param: {
    gid: string;
    branch: 'whjp_store'
  }
) => {
  const [payloads] = await ddb.execute<DBData.GidInfoTable[]>(
    `SELECT content FROM store_data WHERE name = ? AND branch = ?`,
    [param.gid, param.branch]
  );

  if (!payloads || payloads.length === 0) {
    throw new Error(`仓库查询失败`);
  }

  const { content } = payloads[0];

  const decodedContent = DBEncoder.decodeGb2312(content);

  return {
    decodedContent
  };
};

/**
 * 查询武魂精魄仓库
 * @param ddb 
 * @param param 
 * @returns 
 */
export const queryWuhunStoreInfoService = async (
  ddb: Pool,
  param: {
    gid: string;
  }
): Promise<API.QueryWuhunStoreInfoRes> => {
  const { decodedContent } = await queryStoreInfoService(ddb, {
    ...param,
    branch: 'whjp_store'
  });

  return {
    content: decodedContent
  };
}

/**
 * 添加武魂
 * @param ddb 
 * @param params 
 * @returns 
 */
export const addWuhunService = async (
  ddb: Pool,
  params: SendWuhunReq
) => {
  SendWuhunReq.parse(params);

  const { content } = await queryWuhunStoreInfoService(ddb, {
    gid: params.gid
  });

  const ins = new StoreDataWuhunContent(content);

  ins.addEquipBatch(params.wuhuns);

  const resultContent = ins.currentContent;

  const checksum = DBEncoder.genChecksum(
    `store${params.gid}whjp_store${resultContent}`
  );

  await ddb.execute(
    `UPDATE store_data SET content=?,checksum=? WHERE name=? AND branch=?`,
    [DBEncoder.encodeToGb2312(resultContent), checksum, params.gid, 'whjp_store']
  );

  return {
    result: 1
  };
}

/**
 * 重写武魂仓库
 * @param ddb 
 * @param param 
 * @returns 
 */
export const coverStoreDataContentWhjpService = async (
  ddb: Pool,
  param: {
    gid: string;
    content: string;
  }
) => {
  if (!param.gid || !param.content) {
    throw new Error('参数缺失');
  }

  const res = await queryRoleInlineService(ddb, param);

  if (res) {
    throw new Error('当前角色在线, 请下线后再操作');
  }

  const checksum = DBEncoder.genChecksum(`store${param.gid}whjp_store${param.content}`);

  await ddb.execute(
    `UPDATE store_data SET content=?,checksum=? WHERE name=? AND branch=?`,
    [DBEncoder.encodeToGb2312(param.content), checksum, param.gid, 'whjp_store']
  );

  return {
    result: 1
  };
}