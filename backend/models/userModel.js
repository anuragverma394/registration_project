const pool = require("../config/db");

exports.createUser = (
  name,
  email,
  password,
  phone,
  dob,
  gender,
  userType,
  course
) => {

  return pool.query(
    `INSERT INTO "user".users
     (name, email, password, phone, dob, gender, userType, course)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,

    [name, email, password, phone, dob, gender, userType, course]
  );
};
