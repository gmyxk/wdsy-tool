import { UserCarryDataContent } from '@/content';
import { DBEncoder } from '@/lib/encoding';
import { SendHorcruxApiReq, SendJewelryApiReq } from '@/scheme';
import { Pool } from 'mysql2/promise';
import { queryRoleInlineService } from '../account';

/**
 * 发送首饰
 */
export const sendJewelryService = async (
  pool: Pool,
  params: SendJewelryApiReq
) => {
  SendJewelryApiReq.parse(params);

  const res = await queryRoleInlineService(pool, params);

  if (res) {
    throw new Error('当前角色在线, 请下线后再操作');
  }

  const [datas] = await pool.query<DBData.LoginDataTable[]>(
    `SELECT * FROM user_carry_data WHERE name = '${params.gid}'`
  );

  if (!datas || datas.length === 0) {
    throw new Error('角色信息查询失败');
  }

  const content = DBEncoder.decodeGb2312(datas[0].content);

  const ins = new UserCarryDataContent(content);

  ins.addJewelryBatch(params.jewelrys);

  const resultContent = ins.currentContent;

  const checksum = DBEncoder.genChecksum(
    `user_carry${params.gid}${resultContent}`
  );

  const result = await pool.execute(
    `UPDATE user_carry_data SET content=?,checksum=? WHERE name=?`,
    [DBEncoder.encodeToGb2312(resultContent), checksum, params.gid]
  );

  return result;
};

/**
 * 发送首饰
 */
export const sendHorcruxService = async (
  pool: Pool,
  params: SendHorcruxApiReq
) => {
  SendHorcruxApiReq.parse(params);

  const res = await queryRoleInlineService(pool, params);

  if (res) {
    throw new Error('当前角色在线, 请下线后再操作');
  }

  const [datas] = await pool.query<DBData.LoginDataTable[]>(
    `SELECT * FROM user_carry_data WHERE name = '${params.gid}'`
  );

  if (!datas || datas.length === 0) {
    throw new Error('角色信息查询失败');
  }

  const content = DBEncoder.decodeGb2312(datas[0].content);

  const ins = new UserCarryDataContent(content);

  ins.addHorcruxBatch(params.horcruxs);

  const resultContent = ins.currentContent;

  const checksum = DBEncoder.genChecksum(
    `user_carry${params.gid}${resultContent}`
  );

  const result = await pool.execute(
    `UPDATE user_carry_data SET content=?,checksum=? WHERE name=?`,
    [DBEncoder.encodeToGb2312(resultContent), checksum, params.gid]
  );

  return result;
};

/**
 * 清理包裹
 */
export const clearBaggageService = async (
  pool: Pool,
  params: {
    gid: string;
    target: string[];
  }
) => {
  if (!params.gid) {
    throw new Error('角色ID不能为空');
  }

  if (!params.target || params.target.length === 0) {
    throw new Error('目标位置不能为空');
  }
  const res = await queryRoleInlineService(pool, params);

  if (res) {
    throw new Error('当前角色在线, 请下线后再操作');
  }

  const [datas] = await pool.query<DBData.LoginDataTable[]>(
    `SELECT * FROM user_carry_data WHERE name = '${params.gid}'`
  );

  if (!datas || datas.length === 0) {
    throw new Error('角色信息查询失败');
  }

  const content = DBEncoder.decodeGb2312(datas[0].content);

  const ins = new UserCarryDataContent(content);

  ins.clearBaggage(params.target);

  const resultContent = ins.currentContent;

  const checksum = DBEncoder.genChecksum(
    `user_carry${params.gid}${resultContent}`
  );

  const result = await pool.execute(
    `UPDATE user_carry_data SET content=?,checksum=? WHERE name=?`,
    [DBEncoder.encodeToGb2312(resultContent), checksum, params.gid]
  );

  return result;
};
