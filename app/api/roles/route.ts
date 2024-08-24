import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { queryRolesService } from "@/service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const searchRoleName = searchParams.get("roleName");

  try {
    const pool = db.usePool("release_ddb", cookies());

    const data = await queryRolesService(pool, {
      roleName: searchRoleName,
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
