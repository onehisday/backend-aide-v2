const express = require("express");
const transactionRouter = express.Router();
const transactionController = require("../Controllers/transaction.controller");

transactionRouter.get(
  "/api/all/transaction",
  transactionController.getAllTransaction
);
transactionRouter.get(
  "/api/transaction/:_id",
  transactionController.getIdTransaction
);
module.exports = transactionRouter;
