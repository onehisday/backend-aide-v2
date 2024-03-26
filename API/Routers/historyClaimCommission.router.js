const express = require("express");
const historyClaimCommissionRouter = express.Router();
const historyClaimCommissionController = require("../Controllers/historyClaimCommission.controller");

historyClaimCommissionRouter.post(
  "/api/claim/commission",
  historyClaimCommissionController.claimCommission
);

module.exports = historyClaimCommissionRouter;
