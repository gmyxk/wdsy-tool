import { getDbConfigFormRequest } from '@/lib/api';
import db from '@/lib/db';
import {
  coverRoleInfoService,
  editRoleInfoService,
  queryRoleInfoService,
} from '@/service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 查询角色详情
 * @param request
 * @returns
 */
async function queryRoleInfoApi(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const gid = searchParams.get('gid');

  if (!gid) {
    return NextResponse.json(
      {
        success: false,
        message: '参数错误~',
      },
      { status: 400 }
    );
  }

  try {
    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    const data = await queryRoleInfoService(ddb, {
      gid,
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

/**
 * 编辑角色信息
 * @param request
 * @returns
 */
async function editRoleInfoApi(request: NextRequest) {
  try {
    const body = await request.json();

    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    const data = await editRoleInfoService(ddb, body);

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

/**
 * 覆盖角色信息
 * @param request
 * @returns
 */
const coverRoleInfoApi = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { database, connect } = getDbConfigFormRequest(request);

    const ddb = db.usePool(database.ddb, connect);

    const data = await coverRoleInfoService(ddb, body);

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
};

export const GET = queryRoleInfoApi;

export const PUT = editRoleInfoApi;

export const POST = coverRoleInfoApi;
