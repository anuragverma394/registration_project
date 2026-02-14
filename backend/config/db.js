const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Mydatabase",
  password: "root",
  port: 5432,
});

pool.connect()
  .then(() => console.log("Database Connected ✅"))
  .catch((err) => console.error("DB Connection Error ❌", err));

module.exports = pool;
