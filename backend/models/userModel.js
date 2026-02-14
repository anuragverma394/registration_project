const pool = require("../config/db");

exports.createUser = (name, email, password) => {
  return pool.query(
    'INSERT INTO "user".users (name, email, password) VALUES ($1, $2, $3)',
    [name, email, password]
  );
};
