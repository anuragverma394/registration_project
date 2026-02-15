
const bcrypt = require("bcryptjs");
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

    /* ✅ SAFETY FIX — Prevent bcrypt crash */
    if (!password) {
      return res.status(400).json({
        message: "Password is required ❌"
      });
    }

    // ✅ HASH PASSWORD (CRITICAL)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.createUser(
      name.trim(),
      email.trim(),
      hashedPassword,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      pincode,
      qualifications || []   // ✅ SAFETY FIX
    );

    res.json({ message: "User Registered Successfully ✅" });

  } catch (err) {
    console.error("DB ERROR ❌", err);

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
