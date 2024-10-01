import { getDbConfigFormRequest } from '@/lib/api';
import db from '@/lib/db';
import { clearBaggageService, coverUserCarryService, getCarryListService } from '@/service';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;

    const gid = searchParams.get('gid');

    if (!gid) {
      throw new Error('角色ID不能为空');
    }

    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    const data = await getCarryListService(ddb, { gid });

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

const coverUserCarryApi = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    await coverUserCarryService(ddb, body);

    return NextResponse.json({
      success: true,
      message: '修改成功',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message || '操作失败',
    });
  }
}

export const POST = coverUserCarryApi;

export const DELETE = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    await clearBaggageService(ddb, body);

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
