import { getDbConfigFormRequest } from '@/lib/api';
import db from '@/lib/db';
import { queryRolesService } from '@/service';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const searchRoleName = searchParams.get('roleName');

  try {
    const { database, connect } = getDbConfigFormRequest(request);
    
    const pool = db.usePool(database.ddb, connect);

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
        message: (error as Error).message || '出错了~',
      },
      { status: 500 }
    );
  }
}
