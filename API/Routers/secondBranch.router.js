const express = require("express");
const secondBranchRouter = express.Router();
const secondBranchController = require("../Controllers/secondBrand.controller");

secondBranchRouter.post(
    "/api/save/second/branch",
    secondBranchController.saveSecondBranch
);
secondBranchRouter.put(
    "/api/update/second/branch/:_id",
    secondBranchController.updateSecondBranch
);
secondBranchRouter.get(
    "/api/all/second/branch",
    secondBranchController.getAllSecondBranch
);

module.exports = secondBranchRouter;
