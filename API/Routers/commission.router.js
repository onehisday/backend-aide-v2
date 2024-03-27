const express = require("express");
const commissionionRouter = express.Router();
const commissionionController = require("../Controllers/commission.controller");

commissionionRouter.post(
  "/api/create/commissionion",
  commissionionController.createCommission
);
commissionionRouter.put(
  "/api/update/commissionion/:_id",
  commissionionController.updateCommission
);
commissionionRouter.get(
  "/api/all/commissionion",
  commissionionController.getAllCommission
);
commissionionRouter.get(
  "/api/commissionion/:_id",
  commissionionController.getIdCommission
);
module.exports = commissionionRouter;
