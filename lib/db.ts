import mysql from "mysql2/promise";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// 创建全局的 MySQL 连接池
class DB {
  private config: mysql.PoolOptions = {
    connectionLimit: 10,
    charset: "latin1",
  };

  private poolMap = new Map<string, mysql.Pool>();

  public async clearPool() {
    const endPromises = Array.from(this.poolMap.values()).map(async (pool) => {
      await pool.end(); // 等待每个 pool 的结束操作完成
    });

    if (endPromises.length > 0) {
      // 等待所有池都结束
      await Promise.all(endPromises);
    }

    this.poolMap.clear();
  }

  public usePool(database: string, cookie?: ReadonlyRequestCookies) {
    let connectConf = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    };

    if (cookie) {
      connectConf = {
        host: cookie.get("host")?.value,
        user: cookie.get("user")?.value,
        password: cookie.get("password")?.value,
        port: cookie.get("port")?.value,
      };
    }

    if (
      !connectConf.host ||
      !connectConf.user ||
      !connectConf.password ||
      !connectConf.port
    ) {
      throw new Error("请配置数据库连接信息");
    }

    const dbConnectHash = `${connectConf.host}-${connectConf.port}-${connectConf.user}-${connectConf.password}-${database}`;

    let pool = this.poolMap.get(dbConnectHash);

    const { port, ...rest } = connectConf;

    if (!pool) {
      pool = mysql.createPool({
        ...this.config,
        ...rest,
        port: Number(port),
        database,
      });
      this.poolMap.set(database, pool);
    }

    return pool;
  }
}

const db = new DB();

export default db;
