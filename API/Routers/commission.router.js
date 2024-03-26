const express = require("express");
const commissionionRouter = express.Router();
const commissionionController = require("../Controllers/commission.controller");

commissionionRouter.post(
  "/api/create/commissionion",
  commissionionController.createcommissionion
);
commissionionRouter.put(
  "/api/update/commissionion/:_id",
  commissionionController.updatecommissionion
);
commissionionRouter.get(
  "/api/all/commissionion",
  commissionionController.getAllcommissionion
);
commissionionRouter.get(
  "/api/commissionion/:_id",
  commissionionController.getIdcommissionion
);
module.exports = commissionionRouter;
