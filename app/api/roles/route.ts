import { NextRequest, NextResponse } from "next/server";
import iconv from "iconv-lite";
import { ContetFactory } from "@/lib/content";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2";
import logger from "@/lib/logger";

interface LoginDataDto extends RowDataPacket {
  name: string;
  content: string;
}

interface GidInfo extends RowDataPacket {
  gid: string;
  name: string;
  content: string;
}

export async function GET() {
  try {
    const pool = db.usePool("release_ddb");

    const [accounts] = await pool.query<LoginDataDto[]>(
      "SELECT name, content FROM login_data ORDER BY path DESC"
    );

    const accountMap = accounts.reduce<Record<string, string>>(
      (acc, { name, content }) => {
        const obj = ContetFactory.parse<{
          chars: string[];
        }>(iconv.decode(Buffer.from(content, "binary"), "GB2312"));

        if (obj.chars && obj.chars.length > 0) {
          obj.chars.forEach((gid) => {
            acc[gid] = name;
          });
        }

        return acc;
      },
      {}
    );

    const [payloads] = await pool.query<GidInfo[]>(
      `SELECT g.gid, g.name, u.content FROM gid_info g INNER JOIN user_data u ON g.gid = u.name WHERE g.type = 'user' ORDER BY g.gid DESC`
    );

    const data: API.UserListItem[] = payloads.map((item) => {
      const { gid, content, name } = item;

      const roleName = iconv.decode(Buffer.from(name, "binary"), "gbk");

      const decodedContent = iconv.decode(
        Buffer.from(content, "binary"),
        "gbk"
      );

      const obj = ContetFactory.parse<API.UserDataContent>(decodedContent);

      return {
        account: accountMap[gid],
        clazz: "1",
        roleName,
        gender: 1,
        status: 1,
        level: 130,
        ability: obj[49] * 1000,
        gid,
        lastLoginTime: "2023-10-01T12:00:00Z",
        gold: 500,
        createTime: "2023-10-01T12:00:00Z",
      };
    });

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "出错了~",
      },
      { status: 500 }
    );
  }
}
