import { getDbConfigFormRequest } from '@/lib/api';
import db from '@/lib/db';
import { queryZoneInfoService } from '@/service';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const { database, connect } = getDbConfigFormRequest(request);

    const adb = db.usePool(database.adb, connect);

    const list = await queryZoneInfoService(adb);

    return NextResponse.json({
      success: true,
      data: list,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message || '查询失败',
    });
  }
};
