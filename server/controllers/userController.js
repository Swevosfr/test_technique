const asyncHandler = require("express-async-handler");
const User = require("../models/user_model");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Veuillez remplir tous les champs");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("L'utilisateur existe déjà");
  }

  
  res.json({ message: "Register the user" });
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login the user" });
});
module.exports = { registerUser, loginUser };
