const { Router } = require("express");
const publisherRouter = Router();
const publisherController = require("../controllers/publisherController.js");
const auth = require("../middleware/auth.js");

publisherRouter.get(
  "/publisher/overview",
  auth,
  publisherController.submissionOverviewGet,
);

module.exports = publisherRouter;
