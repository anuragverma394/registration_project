const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await userModel.createUser(name, email, password);
    res.json({ message: "User Registered Successfully ✅" });
  } catch (err) {
    console.error("DB ERROR ❌", err);
    res.status(500).json({ message: "Database Error ❌" });
  }
};

