const { Router } = require("express");
const accessorRouter = Router();
const accessorController = require("../controllers/accessorController.js");
const auth = require("../middleware/auth.js");
const authRouter = require("./authRouter");

authRouter.get(
  "/accessor/overview",
  auth,
  accessorController.reviewOverviewGet,
);

module.exports = authRouter;
