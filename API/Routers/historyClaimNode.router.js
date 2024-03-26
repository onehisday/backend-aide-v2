const express = require("express");
const historyClaimNodeRouter = express.Router();
const historyClaimNodeController = require("../Controllers/historyClaimNode.controller");

historyClaimNodeRouter.post(
  "/api/claim/node",
  historyClaimNodeController.claimNode
);
module.exports = historyClaimNodeRouter;
