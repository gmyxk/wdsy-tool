import { getDbConfigFormRequest } from '@/lib/api';
import db from '@/lib/db';
import { sendJewelryService } from '@/service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 发送首饰
 * @returns
 */
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    await sendJewelryService(ddb, body);

    return NextResponse.json({
      success: true,
      message: '发送成功',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message || '发送失败',
    });
  }
};
