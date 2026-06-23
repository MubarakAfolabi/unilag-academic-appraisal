const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController.js");

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.login);

module.exports = authRouter;
