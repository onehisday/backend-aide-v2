const express = require("express");
const transactionTonRouter = express.Router();
const transactionTonController = require("../Controllers/transactionTon.controller");

transactionTonRouter.post("/api/boc/ton", transactionTonController.bocTon);

module.exports = transactionTonRouter;
