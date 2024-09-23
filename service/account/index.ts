import {
  DataRuntimeContent,
  LoginDataContent,
  UserDataContent,
} from '@/content';
import { DBEncoder } from '@/lib/encoding';
import { Pool } from 'mysql2/promise';

const formatRoleInfo = (
  data: DBData.GidInfoTable & {
    account: string;
    isOnline: 0 | 1;
  }
): API.RoleListItem => {
  const { gid, content, name, account, isOnline } = data;

  const roleName = DBEncoder.decodeGb2312(name);

  const decodedContent = DBEncoder.decodeGb2312(content);

  try {
    const ins = new UserDataContent(decodedContent);

    const roleInfo = ins.roleInfo;

    return {
      account: account,
      clazz: roleInfo.clazz,
      roleName,
      gender: roleInfo.gender,
      status: isOnline || 0,
      level: roleInfo.level,
      ability: roleInfo.ability,
      gid,
      // lastLoginTime: '2023-10-01T12:00:00Z',
      // gold: 500,
      // createTime: '2023-10-01T12:00:00Z',
    };
  } catch (error) {
    console.error(error);
    return {
      account: account,
      clazz: 1,
      roleName: `Error - ${roleName}`,
      gender: 1,
      status: isOnline || 0,
      level: 0,
      ability: 0,
      gid,
      // lastLoginTime: '2023-10-01T12:00:00Z',
      // gold: 500,
      // createTime: '2023-10-01T12:00:00Z',
    };
  }
};

/**
 * 查询区组名称
 * @param adb
 */
export const queryZoneInfoService = async (adb: Pool) => {
  const [rows] = await adb.query<DBData.AaaTable[]>(
    'SELECT aaa, dist, ip FROM aaa ORDER BY aaa DESC'
  );

  return rows.map((item) => {
    return {
      ...item,
      dist: DBEncoder.decodeGb2312(item.dist),
    };
  });
};

/**
 * 查询角色
 * @param pool
 */
export const queryRolesService = async (
  ddb: Pool,
  param?: {
    roleName?: string | null;
  }
) => {
  const searchRoleName = param?.roleName;

  // 查询角色账号
  const [accounts] = await ddb.query<DBData.LoginDataTable[]>(
    'SELECT name, content FROM login_data'
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
  const [inLineDatas] = await ddb.query<DBData.LoginDataTable[]>(
    "SELECT name, content FROM data WHERE path = 'runtime'"
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

  const [payloads] = await ddb.query<DBData.GidInfoTable[]>(
    `SELECT g.gid, g.name, u.content FROM gid_info g INNER JOIN user_data u ON g.gid = u.name WHERE g.type = 'user' ${likeStr}`
  );

  const data = payloads.map<API.RoleListItem>((item) => {
    return formatRoleInfo({
      ...item,
      account: accountMap[item.gid],
      isOnline: inLineMap[item.gid],
    });
  });

  const sortedData = data.sort((a, b) => {
    return b.status - a.status;
  });

  return sortedData;
};

/**
 * 判断角色账号
 * @param pool
 * @param param
 * @returns
 */
export const queryRoleInAccountService = async (
  ddb: Pool,
  param: {
    gid: string;
  }
) => {
  const [rows] = await ddb.execute<DBData.LoginDataTable[]>(
    'SELECT name, content FROM login_data WHERE content LIKE ?',
    [`%${param.gid}%`]
  );

  return rows[0].name;
};

/**
 * 判断角色是否在线
 * @param pool
 * @param param
 * @returns
 */
export const queryRoleInlineService = async (
  ddb: Pool,
  param: {
    gid: string;
  }
) => {
  const [rows] = await ddb.query<DBData.LoginDataTable[]>(
    `SELECT * FROM data WHERE path = 'runtime' AND content LIKE '%${param.gid}%'`
  );

  return rows.length > 0;
};
