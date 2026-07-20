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

authRouter.get(
  "/accessor/pending-reviews",
  auth,
  accessorController.pendingReviewsGet,
);

authRouter.get(
  "/accessor/recent-activities",
  auth,
  accessorController.recentActivitiesGet,
);

authRouter.get("/accessor/reviews", auth, accessorController.allReviewsGet);

authRouter.get(
  "/accessor/publications/:publicationId",
  auth,
  accessorController.publicationGet,
);

module.exports = authRouter;
