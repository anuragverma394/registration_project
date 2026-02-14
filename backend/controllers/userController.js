const userModel = require("../models/userModel");

exports.register = async (req, res) => {

  console.log("REQ BODY →", req.body);

  const {
    name,
    email,
    password,
    phone,
    dob,
    gender,
    address,
    city,
    state,
    pincode,
    qualifications
  } = req.body;

  try {

    await userModel.createUser(
      name,
      email,
      password,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      pincode,
      qualifications
    );

    res.json({ message: "User Registered Successfully ✅" });

  } catch (err) {

    console.error("DB ERROR ❌", err);

    // ✅ PostgreSQL duplicate email error
    if (err.code === "23505") {
      return res.status(400).json({
        message: "Email already registered ❌"
      });
    }

    res.status(500).json({
      message: "Database Error ❌"
    });
  }
};
