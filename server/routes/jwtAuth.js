const router = require("express").Router();
const jwtGenerator = require("../utils/jwtGenerator");
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
