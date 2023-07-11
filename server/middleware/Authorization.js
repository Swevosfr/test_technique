const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Authorization = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("L'utilisateur n'est pas authorisé");
      }
      req.user = decoded.user;
      console.log(req.user);
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error({
        message: "L'utilisateur n'est pas authorisé ou le token est expiré",
      });
    }
  }
});

module.exports = Authorization;
