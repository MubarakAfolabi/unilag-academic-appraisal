const { Router } = require("express");
const hrmdRouter = Router();
const hrmdController = require("../controllers/hrmdController.js");
const auth = require("../middleware/auth.js");

hrmdRouter.get(
  "/hrmd/publications",
  auth,
  hrmdController.unassignedPublicationsGet,
);

module.exports = hrmdRouter;
