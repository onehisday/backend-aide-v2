const express = require("express");
const walletRouter = express.Router();
const walletController = require("../Controllers/wallet.controller");
walletRouter.post("/api/create/wallet", walletController.createWallet);
walletRouter.put("/api/update/wallet/:_id", walletController.updateWallet);
walletRouter.get("/api/all/wallet", walletController.getAllWallet);
walletRouter.delete("/api/delete/wallet/:_id", walletController.deleteWallet);
walletRouter.get("/api/wallet/:_id", walletController.getIdWallet);
module.exports = walletRouter;
