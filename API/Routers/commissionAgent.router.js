const express = require("express");
const commissionAgentRouter = express.Router();
const commissionAgentController = require("../Controllers/childAffiliate.controller");
const childAffiliateController = require("../Controllers/childAffiliate.controller");

commissionAgentRouter.post("/api/save/test", childAffiliateController.order);

module.exports = commissionAgentRouter;
