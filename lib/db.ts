import mysql from "mysql2/promise";

// 创建全局的 MySQL 连接池
class DB {
  private config: mysql.PoolOptions = {
    connectionLimit: 20,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    charset: "latin1",
  };

  private poolMap = new Map<string, mysql.Pool>();

  public usePool(database: string) {
    let pool = this.poolMap.get(database);

    if (!pool) {
      pool = mysql.createPool({
        ...this.config,
        database,
      });
      this.poolMap.set(database, pool);
    }

    return pool;
  }
}

const db = new DB();

export default db;
