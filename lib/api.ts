import { WdCommonApiReq } from '@/scheme';
import { NextRequest, NextResponse } from 'next/server';
import { Decrypt } from './crypto';
import db from '@/lib/db';
import type { Pool } from 'mysql2/promise';

/**
 * 获取数据库连接数据
 * @param request
 * @returns
 */
export const getDbConfigFormRequest = (request: NextRequest) => {
  const data = request.headers.get('Avid');

  if (!data) {
    throw new Error('无效的连接参数');
  }

  const config = JSON.parse(Decrypt(data)) as WdCommonApiReq;

  WdCommonApiReq.parse(config);

  return config;
};

/**
 * api 公共回调方法
 * @param fn 
 * @returns 
 */
export const wdApiFormat = <Body = object, Params = object, Result = object>(fn: (props: {
  body: Body
  searchParams: URLSearchParams
  params: Params
  pools: {
    useAdb: () => Pool
    useDdb: () => Pool
  }
}) => Promise<Result>) => {
  return async (request: NextRequest, { params }: { params: Params }) => {
    try {
      const body = request.body ? await request.json() : {} as Body;

      const { searchParams } = request.nextUrl;

      const { database, connect } = getDbConfigFormRequest(request);

      const pools = {
        usePool: (tar: string) => db.usePool(database[tar as keyof typeof database], connect),
        useAdb: () => db.usePool(database.adb, connect),
        useDdb: () => db.usePool(database.ddb, connect),
      }

      const result = await fn({
        body,
        searchParams,
        params,
        pools
      })

      return NextResponse.json({
        success: true,
        data: result
      })
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        success: false,
        message: (error as Error).message || '获取失败',
      }, {
        status: 500
      });
    }
  }
}