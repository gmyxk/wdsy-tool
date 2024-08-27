import { UserCarryDataContent, UserDataContent } from '@/content';
import { DBEncoder } from '@/lib/encoding';
import { EditConsumptionPointsApiReq } from '@/scheme';
import { Pool } from 'mysql2/promise';
import { queryRoleInlineService } from '../account';

/**
 * 修改消费积分
 */
export const editConsumptionPointsService = async (
  pool: Pool,
  params: EditConsumptionPointsApiReq
) => {
  EditConsumptionPointsApiReq.parse(params);

  const res = await queryRoleInlineService(pool, params);

  if (res) {
    throw new Error('当前角色在线, 请下线后再操作');
  }

  const [datas] = await pool.query<DBData.LoginDataTable[]>(
    `SELECT * FROM user_data WHERE name = '${params.gid}'`
  );

  if (!datas || datas.length === 0) {
    throw new Error('角色信息查询失败');
  }

  const content = DBEncoder.decodeGb2312(datas[0].content);

  const ins = new UserDataContent(content);

  ins.setConsumptionPoints(params.points);

  const resultContent = ins.currentContent;

  const checksum = DBEncoder.genChecksum(
    `user${params.gid}${resultContent}`
  );

  const result = await pool.execute(
    `UPDATE user_data SET content=?,checksum=? WHERE name=?`,
    [DBEncoder.encodeToGb2312(resultContent), checksum, params.gid]
  );

  return result;
};