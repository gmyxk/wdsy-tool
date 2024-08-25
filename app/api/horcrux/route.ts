import db from '@/lib/db';
import { sendHorcruxService } from '@/service';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 发送魂器
 * @returns
 */
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const pool = db.usePool('release_ddb', cookies());

    await sendHorcruxService(pool, body);

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
