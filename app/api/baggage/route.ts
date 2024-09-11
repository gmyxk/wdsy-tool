import db from '@/lib/db';
import { clearBaggageService, getCarryListService } from '@/service';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;

    const gid = searchParams.get('gid');

    if (!gid) {
      throw new Error('角色ID不能为空');
    }

    const pool = db.usePool('release_ddb', cookies());

    const data = await getCarryListService(pool, { gid });

    return NextResponse.json({
      success: true,
      data,
      message: '清理成功',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message || '获取失败',
    });
  }
};

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
