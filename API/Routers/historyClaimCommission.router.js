const express = require("express");
const historyClaimCommissionRouter = express.Router();
const historyClaimCommissionController = require("../Controllers/historyClaimCommission.controller");

historyClaimCommissionRouter.post(
  "/api/claim/commission",
  historyClaimCommissionController.claimCommission
);
historyClaimCommissionRouter.get(
  "/api/all/history/commission",
  historyClaimCommissionController.getAllCommission
);
historyClaimCommissionRouter.get(
  "/api/id/commission/:_id",
  historyClaimCommissionController.getIdCommission
);
historyClaimCommissionRouter.put(
  "/api/history/claim/:_id",
  historyClaimCommissionController.updateHistoryCommission
);

module.exports = historyClaimCommissionRouter;
