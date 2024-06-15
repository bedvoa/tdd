import mysql from "mysql2/promise";

// mysql connection pool
export const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "tdd",
  port: 3305,
});
