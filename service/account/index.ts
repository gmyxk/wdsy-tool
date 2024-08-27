import {
  DataRuntimeContent,
  LoginDataContent,
  UserDataContent,
} from '@/content';
import { DBEncoder } from '@/lib/encoding';
import { Pool } from 'mysql2/promise';

/**
 * 查询角色
 * @param pool
 */
export const queryRolesService = async (
  pool: Pool,
  param?: {
    roleName?: string | null;
  }
) => {
  const searchRoleName = param?.roleName;

  // 查询角色账号
  const [accounts] = await pool.query<DBData.LoginDataTable[]>(
    'SELECT name, content FROM login_data ORDER BY path DESC'
  );

  const accountMap = accounts.reduce<Record<string, string>>(
    (acc, { name, content }) => {
      const obj = new LoginDataContent(DBEncoder.decodeGb2312(content));

      if (obj.gids && obj.gids.length > 0) {
        obj.gids.forEach((gid) => {
          acc[gid] = name;
        });
      }

      return acc;
    },
    {}
  );

  // 查询在线角色
  const [inLineDatas] = await pool.query<DBData.LoginDataTable[]>(
    "SELECT name, content FROM data WHERE path = 'runtime' ORDER BY path DESC"
  );

  const inLineMap = inLineDatas.reduce<Record<string, 1>>(
    (acc, { name, content }) => {
      const ins = new DataRuntimeContent(DBEncoder.decodeGb2312(content));

      acc[ins.inLineGid] = 1;
      return acc;
    },
    {}
  );

  const likeStr = searchRoleName
    ? `AND g.name LIKE '%${DBEncoder.encodeToGb2312(searchRoleName)}%'`
    : '';

  const [payloads] = await pool.query<DBData.GidInfoTable[]>(
    `SELECT g.gid, g.name, u.content FROM gid_info g INNER JOIN user_data u ON g.gid = u.name WHERE g.type = 'user' ${likeStr} ORDER BY g.gid DESC`
  );

  const data = payloads.map<API.RoleListItem>((item) => {
    const { gid, content, name } = item;

    const roleName = DBEncoder.decodeGb2312(name);

    const decodedContent = DBEncoder.decodeGb2312(content);

    const ins = new UserDataContent(decodedContent);

    const roleInfo = ins.roleInfo;

    return {
      account: accountMap[gid],
      clazz: roleInfo.clazz,
      roleName,
      gender: roleInfo.gender,
      status: inLineMap[gid] || 0,
      level: roleInfo.level,
      ability: roleInfo.ability,
      gid,
      lastLoginTime: '2023-10-01T12:00:00Z',
      gold: 500,
      createTime: '2023-10-01T12:00:00Z',
    };
  });

  const sortedData = data.sort((a, b) => {
    return b.status - a.status;
  });

  return sortedData;
};

/**
 * 判断角色是否在线
 * @param pool
 * @param param
 * @returns
 */
export const queryRoleInlineService = async (
  pool: Pool,
  param: {
    gid: string;
  }
) => {
  const [rows] = await pool.query<DBData.LoginDataTable[]>(
    `SELECT * FROM data WHERE path = 'runtime' AND content LIKE '%${param.gid}%'`
  );

  return rows.length > 0;
};
