import { getDbConfigFormRequest } from '@/lib/api';
import db from '@/lib/db';
import { queryRoleInfoService } from '@/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const gid = searchParams.get('gid');

  if (!gid) {
    return NextResponse.json(
      {
        success: false,
        message: '参数错误~',
      },
      { status: 400 }
    );
  }

  try {
    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    const data = await queryRoleInfoService(ddb, {
      gid,
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
        message: (error as Error).message || '出错了~',
      },
      { status: 500 }
    );
  }
}
