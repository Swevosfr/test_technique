const asyncHandler = require("express-async-handler");
const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

  //hasher le mot de passe
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);

  //Nouvel utilisateur
  const user = await User.create({
    email,
    password: bcryptPassword,
  });

  console.log("creation de l'utilisateur", user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("Les données de l'utilisateur ne sont pas valide");
  }

  res.json({ message: "Register the user" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Veuillez remplir tous les champs");
  }
  const user = await User.findOne({ email });

  // Comparer le mot de passe en input et le mot de passe en base de données
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          email: user.email,
          password: user.password,
          id: user.id,
        },
      },
      process.env.jwtSecret,
      { expiresIn: "24h" }
    );
    res.status(200).json({ token });
  } else {
    res.status(401);
    throw new Error("L'email ou le mot de passe n'est pas valide");
  }
});

const test = asyncHandler(async (req, res) => {
  res.json({ message: "coucou" });
});
module.exports = { registerUser, loginUser, test };
