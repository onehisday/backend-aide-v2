const express = require("express");
const promotionRouter = express.Router();
const promotionController = require("../Controllers/promotion.controller");
promotionRouter.post(
  "/api/create/promo",
  promotionController.createCouponByAmount
);
promotionRouter.get("/api/all/promotion", promotionController.getAllPromotion);
promotionRouter.get("/api/promo/:_id", promotionController.getIdPromotion);
promotionRouter.delete(
  "/api/delete/promo/:_id",
  promotionController.deleteOnePromo
);
promotionRouter.delete(
  "/api/delete/all/promo",
  promotionController.deleteAllPromo
);
module.exports = promotionRouter;
