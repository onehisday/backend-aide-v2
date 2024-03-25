const express = require("express");
const hrefRouter = express.Router();
const hrefController = require("../../API/Controllers/href.controller");

//hrefRouter.post("/api/href", hrefController.createHref);
hrefRouter.post("/api/save/href", hrefController.saveHref);
hrefRouter.get("/api/address/:_id", hrefController.findAddress);
hrefRouter.get("/api/rose/grand/:_id", hrefController.rewardRefGrand);
hrefRouter.get("/api/grand/child", hrefController.getAllGrandChild);
module.exports = hrefRouter;
