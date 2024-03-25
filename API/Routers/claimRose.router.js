const express = require("express");
const claimRoseRouter = express.Router();
const claimRoseController = require("../Controllers/claimRose.controller");

claimRoseRouter.post("/api/new/claim/rose", claimRoseController.postClaimRose);
claimRoseRouter.put(
  "/api/update/claim/rose/:_id",
  claimRoseController.updateReward
);

module.exports = claimRoseRouter;
