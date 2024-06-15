const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "tdd_test",
  password: "gcubme@@!!",
});

module.exports = {
  load: async (sql, params) => {
    const [rows] = await pool.execute(sql, params);
    return rows;
  },
};
