import db from '@/lib/db';
import { clearBaggageService } from '@/service';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const pool = db.usePool('release_ddb', cookies());

    await clearBaggageService(pool, body);

    return NextResponse.json({
      success: true,
      message: '清理成功',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message || '清理失败',
    });
  }
};
