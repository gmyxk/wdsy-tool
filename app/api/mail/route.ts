import { sendMailService } from "@/service";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // 解析请求体中的 JSON 数据
    const body = await request.json();

    const pool = db.usePool("release_ddb", cookies());

    await sendMailService(pool, body);
    return NextResponse.json({ success: true, message: "邮件发送成功" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "出错了~",
      },
      { status: 500 }
    );
  }
}
