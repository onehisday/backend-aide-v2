const express = require("express");
const withdrawRouter = express.Router();
const withdrawController = require("../Controllers/withdraw.controller");

withdrawRouter.post("/api/save/withdraw", withdrawController.saveDrawUser);
withdrawRouter.get("/api/withdraw/:_id", withdrawController.getHistoryWithdraw);
withdrawRouter.get(
    "/api/all/withdraw",
    withdrawController.getAllHistoryWithdraw
);

module.exports = withdrawRouter;
