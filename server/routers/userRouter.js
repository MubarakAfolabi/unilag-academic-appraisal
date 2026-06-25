const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController.js");
const auth = require("../middleware/auth.js");
const { user } = require("../prisma/prisma");

userRouter.patch("/users/me", auth, userController.updateUser);

module.exports = userRouter;
