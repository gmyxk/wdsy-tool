import { UserDataContent } from '@/content';
import { DBEncoder } from '@/lib/encoding';
import { EditRoleInfoApiReq, EditRoleInfoPayload } from '@/scheme';
import { Pool } from 'mysql2/promise';
import { queryRoleInAccountService, queryRoleInlineService } from '../account';

/**
 * 查询指定角色信息
 * @param ddb
 * @param param
 * @returns
 */
export const queryRoleInfoService = async (
  ddb: Pool,
  param: {
    gid: string;
  }
): Promise<API.RoleInfo> => {
  const isOnline = await queryRoleInlineService(ddb, param);
  const account = await queryRoleInAccountService(ddb, param);

  const [payloads] = await ddb.query<DBData.GidInfoTable[]>(
    `SELECT g.gid, g.name, u.content FROM gid_info g INNER JOIN user_data u ON g.gid = u.name WHERE g.type = 'user' AND g.gid = '${param.gid}'`
  );

  const { gid, content, name } = payloads[0];

  const roleName = DBEncoder.decodeGb2312(name);

  const decodedContent = DBEncoder.decodeGb2312(content);

  const ins = new UserDataContent(decodedContent);

  const roleInfo = ins.roleInfo;

  return {
    gid,
    account: account,
    roleName,
    userDataContent: decodedContent,
    status: isOnline ? 1 : 0,
    ...roleInfo,
  };
};

/**
 * 修改指定角色信息
 * @param ddb
 * @param param
 * @returns
 */
export const editRoleInfoService = async (
  ddb: Pool,
  param: EditRoleInfoApiReq
) => {
  if (!param.gid) {
    throw new Error('角色ID不能为空');
  }
  EditRoleInfoPayload.parse(param);

  const res = await queryRoleInlineService(ddb, param);

  if (res) {
    throw new Error('当前角色在线, 请下线后再操作');
  }

  const [datas] = await ddb.execute<DBData.GidInfoTable[]>(
    `SELECT * FROM user_data WHERE name = ?`,
    [param.gid]
  );

  if (!datas || datas.length === 0) {
    throw new Error('角色信息查询失败');
  }

  const content = DBEncoder.decodeGb2312(datas[0].content);

  const ins = new UserDataContent(content);

  ins.patchRoleInfo(param.payload);

  const resultContent = ins.currentContent;

  const checksum = DBEncoder.genChecksum(`user${param.gid}${resultContent}`);

  const result = await ddb.execute(
    `UPDATE user_data SET content=?,checksum=? WHERE name=?`,
    [DBEncoder.encodeToGb2312(resultContent), checksum, param.gid]
  );

  return result;
};

/**
 * 修改指定角色信息
 * @param ddb
 * @param param
 * @returns
 */
export const coverRoleInfoService = async (
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

  const checksum = DBEncoder.genChecksum(`user${param.gid}${param.content}`);

  const result = await ddb.execute(
    `UPDATE user_data SET content=?,checksum=? WHERE name=?`,
    [DBEncoder.encodeToGb2312(param.content), checksum, param.gid]
  );

  return result;
};
