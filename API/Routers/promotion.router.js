const express = require("express");
const promotionRouter = express.Router();
const promotionController = require("../Controllers/promotion.controller");
promotionRouter.post(
  "/api/create/promo",
  promotionController.createCouponByAmount
);
module.exports = promotionRouter;
