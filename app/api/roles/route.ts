import { NextRequest, NextResponse } from "next/server";
import iconv from "iconv-lite";
import { ContetFactory } from "@/lib/content";
import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const searchRoleName = searchParams.get("roleName");

  try {
    const pool = db.usePool("release_ddb", cookies());

    // 查询角色账号
    const [accounts] = await pool.query<DBData.LoginDataTable[]>(
      "SELECT name, content FROM login_data ORDER BY path DESC"
    );

    const accountMap = accounts.reduce<Record<string, string>>(
      (acc, { name, content }) => {
        const obj = ContetFactory.parse<DBData.LoginDataContent>(
          iconv.decode(Buffer.from(content, "binary"), "gb2312")
        );

        if (obj.chars && obj.chars.length > 0) {
          obj.chars.forEach((gid) => {
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
        const obj = ContetFactory.parse<DBData.DataRuntimeContent>(
          iconv.decode(Buffer.from(content, "binary"), "gb2312")
        );

        acc[obj.locked_gid] = 1;
        return acc;
      },
      {}
    );

    const likeStr = searchRoleName
      ? `AND g.name LIKE '%${iconv
          .encode(searchRoleName, "gb2312")
          .toString("binary")}%'`
      : "";

    const [payloads] = await pool.query<DBData.GidInfoTable[]>(
      `SELECT g.gid, g.name, u.content FROM gid_info g INNER JOIN user_data u ON g.gid = u.name WHERE g.type = 'user' ${likeStr} ORDER BY g.gid DESC`
    );

    const data = payloads.map<API.UserListItem>((item) => {
      const { gid, content, name } = item;

      const roleName = iconv.decode(Buffer.from(name, "binary"), "gb2312");

      const decodedContent = iconv.decode(
        Buffer.from(content, "binary"),
        "gb2312"
      );

      const obj = ContetFactory.parse<API.UserDataContent>(decodedContent);

      return {
        account: accountMap[gid],
        clazz: "1",
        roleName,
        gender: 1,
        status: inLineMap[gid] || 0,
        level: 130,
        ability: obj[49] * 1000,
        gid,
        lastLoginTime: "2023-10-01T12:00:00Z",
        gold: 500,
        createTime: "2023-10-01T12:00:00Z",
      };
    });

    const sortedData = data.sort((a, b) => {
      return b.status - a.status;
    });

    return NextResponse.json(
      {
        success: true,
        data: sortedData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "出错了~",
      },
      { status: 500 }
    );
  }
}
