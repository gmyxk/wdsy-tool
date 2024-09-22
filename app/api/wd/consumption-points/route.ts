import { getDbConfigFormRequest } from '@/lib/api';
import db from '@/lib/db';
import { editConsumptionPointsService } from '@/service';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 修改积分
 * @returns
 */
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    await editConsumptionPointsService(ddb, body);

    return NextResponse.json({
      success: true,
      message: '修改成功',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message || '修改失败',
    });
  }
};
