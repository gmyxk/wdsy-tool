import { WdCommonApiReq } from '@/scheme';
import { NextRequest } from 'next/server';
import { Decrypt } from './crypto';

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
