import mysql, { Pool, PoolConnection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const getConnectionPostPool: () => Promise<PoolConnection> =
  async (): Promise<PoolConnection> => {
    return await pool.getConnection();
  };
