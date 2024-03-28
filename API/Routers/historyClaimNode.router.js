const express = require("express");
const historyClaimNodeRouter = express.Router();
const historyClaimNodeController = require("../Controllers/historyClaimNode.controller");

historyClaimNodeRouter.post(
  "/api/claim/node",
  historyClaimNodeController.claimNode
);
historyClaimNodeRouter.get(
  "/api/all/claim/history/node",
  historyClaimNodeController.getAllHistoryClaimNode
);
historyClaimNodeRouter.get(
  "/api/claim/history/node/:_id",
  historyClaimNodeController.getIdHistoryClaimNode
);
historyClaimNodeRouter.get(
  "/api/claim/node/address/:_id",
  historyClaimNodeController.getIdWalletAddress
);
module.exports = historyClaimNodeRouter;
