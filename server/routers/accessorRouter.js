const { Router } = require("express");
const accessorRouter = Router();
const accessorController = require("../controllers/accessorController.js");
const downloadController = require("../controllers/downloadController.js");
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
  "/accessor/reviews/:reviewId",
  auth,
  accessorController.reviewGet,
);

authRouter.get(
  "/accessor/publications/:publicationId/download",
  auth,
  downloadController.downloadPublicationFile,
);

authRouter.patch(
  "/accessor/reviews/:reviewId/status",
  auth,
  accessorController.reviewStatusPatch,
);

authRouter.patch(
  "/accessor/reviews/:reviewId/score",
  auth,
  accessorController.reviewScorePatch,
);

authRouter.get(
  "/accessors/reviews/overview",
  auth,
  accessorController.reviewCountGet,
);
module.exports = authRouter;
