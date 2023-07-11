const router = require("express").Router();
const {
  registerUser,
  loginUser,
  test,
} = require("../controllers/userController");
const Authorization = require("../middleware/Authorization");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/test", Authorization, test);

module.exports = router;
