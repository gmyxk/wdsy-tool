import db from '@/lib/db';
import { sendEquipService } from '@/service';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 发送装备
 * @returns
 */
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const pool = db.usePool('release_ddb', cookies());

    await sendEquipService(pool, body);

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