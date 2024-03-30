const express = require("express");
const tierRouter = express.Router();
const tierController = require("../Controllers/tier.controller");

tierRouter.post(
  "/api/create/tier",

  tierController.createTier
);
tierRouter.put(
  "/api/update/tier/:_id",

  tierController.updateTier
);
tierRouter.delete(
  "/api/delete/tier/:_id",

  tierController.deleteTier
);
tierRouter.get("/api/next/tier", tierController.getTierNext);
tierRouter.get(
  "/api/all/tier",

  tierController.getAllTier
);
tierRouter.get(
  "/api/tier/:_id",

  tierController.getOneTier
);

module.exports = tierRouter;
