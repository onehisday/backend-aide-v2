const express = require("express");
const rewardRouter = express.Router();
const rewardController = require("../Controllers/reward.controller");

rewardRouter.post(
  "/api/new/reward",

  rewardController.postReward
);
rewardRouter.get(
  "/api/all/reward",

  rewardController.getAllReward
);
rewardRouter.get("/api/reward/:_id", rewardController.getByIdReward);
rewardRouter.put(
  "/api/update/reward/:_id",

  rewardController.updateReward
);

module.exports = rewardRouter;
