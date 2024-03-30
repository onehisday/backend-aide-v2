const express = require("express");
const claimNodeRouter = express.Router();
const claimNodeController = require("../Controllers/claimNode.controller");

claimNodeRouter.post(
  "/api/new/claim/node",

  claimNodeController.postClaimNode
);
claimNodeRouter.put(
  "/api/update/claim/node/:_id",

  claimNodeController.updateClaimNode
);
claimNodeRouter.get(
  "/api/all/claim/node",

  claimNodeController.getAllNode
);
claimNodeRouter.get(
  "/api/claim/node/:_id",

  claimNodeController.getIdNode
);

module.exports = claimNodeRouter;
