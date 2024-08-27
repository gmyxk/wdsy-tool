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

    const pool = db.usePool('release_ddb', cookies());

    await editConsumptionPointsService(pool, body);

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
