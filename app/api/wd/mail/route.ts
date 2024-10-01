import { sendMailService } from "@/service";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getDbConfigFormRequest } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    // 解析请求体中的 JSON 数据
    const body = await request.json();

    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    await sendMailService(ddb, body);
    return NextResponse.json({ success: true, message: "邮件发送成功" });
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
