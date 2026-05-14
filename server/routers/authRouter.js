const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController.js");

authRouter.post("/register", authController.registerUser);
authRouter.post("/:role/login", authController.login);

module.exports = authRouter;
