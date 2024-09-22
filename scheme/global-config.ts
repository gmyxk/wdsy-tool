import { z } from 'zod';

export const GlobalDbConnectConfig = z.object({
  user: z.string().min(1),
  host: z.string().ip(),
  port: z.number().int().min(1).max(65535),
  password: z.string().min(5),
});

export type GlobalDbConnectConfig = z.infer<typeof GlobalDbConnectConfig>;

const GlobalDatabaseConfig = z.object({
  /** 唯一标识 */
  name: z.string().min(1),
  sdk: z.string().min(1),
  adb: z.string().min(1),
  ddb: z.string().min(1),
});

export const GlobalDbConfig = z.object({
  connect: GlobalDbConnectConfig,
  databases: GlobalDatabaseConfig.array()
    .refine((val) => val.length > 0, '至少需要一个数据库')
    .refine(
      (val) => {
        const names = val.map((i) => i.name);
        return names.length === new Set(names).size;
      },
      {
        message: '配置名称不可重复',
      }
    ),
  /** 生效的区组 */
  effectiveZone: z.string().min(1),
});

export type GlobalDbConfig = z.infer<typeof GlobalDbConfig>;

/**
 * 全局配置
 */
export const GlobalConfig = z.object({
  dbConfig: GlobalDbConfig,
});

export type GlobalConfig = z.infer<typeof GlobalConfig>;

/**
 * 测试连接接口请求参数
 */
export const WdCommonApiReq = z.object({
  connect: GlobalDbConnectConfig,
  database: GlobalDatabaseConfig,
});

export type WdCommonApiReq = z.infer<typeof WdCommonApiReq>;
