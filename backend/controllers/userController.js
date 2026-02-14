const userModel = require("../models/userModel");

exports.register = async (req, res) => {
    console.log("REQ BODY ", req.body); 

  const { name, email, password, phone, dob, gender, userType, course } = req.body;

  try {

    await userModel.createUser(
      name,
      email,
      password,
      phone,
      dob,
      gender,
      userType,  
      course
    );

    res.json({ message: "User Registered Successfully ✅" });

  } catch (err) {

    console.error("DB ERROR ❌", err);

    if (err.code === "23505") {
      return res.status(400).json({ message: "Email already registered ❌" });
    }

    res.status(500).json({ message: "Database Error ❌" });
  }
};
