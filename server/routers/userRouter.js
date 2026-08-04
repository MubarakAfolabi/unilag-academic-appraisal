const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController.js");
const auth = require("../middleware/auth.js");
const { user } = require("../prisma/prisma");

userRouter.patch("/users/me", auth, userController.updateUser);
userRouter.get("/users", auth, userController.usersGet);
userRouter.get("/user/:userId", auth, userController.userGet);

module.exports = userRouter;
