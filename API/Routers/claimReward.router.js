const express = require("express");
const claimRewardRouter = express.Router();
const claimRewardController = require("../Controllers/claimReward.controller");

claimRewardRouter.post(
    "/api/save/claim/reward",
    claimRewardController.postReward
);
claimRewardRouter.put(
    "/api/update/claim/reward/:_id",
    claimRewardController.updateStatus
);

module.exports = claimRewardRouter;
