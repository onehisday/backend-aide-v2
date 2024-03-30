const express = require("express");
const claimRoseRouter = express.Router();
const claimRoseController = require("../Controllers/claimRose.controller");

claimRoseRouter.post(
  "/api/new/claim/rose",

  claimRoseController.postClaimRose
);
claimRoseRouter.put(
  "/api/update/claim/rose/:_id",

  claimRoseController.updateReward
);
claimRoseRouter.get(
  "/api/all/claim/rose",

  claimRoseController.getAllRose
);
claimRoseRouter.get(
  "/api/all/claim/rose/:_id",

  claimRoseController.getIdRose
);

module.exports = claimRoseRouter;
