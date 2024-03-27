const express = require("express");
const promotionRouter = express.Router();
const promotionController = require("../Controllers/promotion.controller");
promotionRouter.post(
  "/api/create/promo",
  promotionController.createCouponByAmount
);
promotionRouter.get(
  "/api/all/promotion/happen",
  promotionController.promotionHappen
);
promotionRouter.get(
  "/api/all/promotion/commingsoon",
  promotionController.promotionCommingSoon
);
promotionRouter.get(
  "/api/all/promotion/finished",
  promotionController.promotionFinished
);
promotionRouter.get("/api/promo/:_id", promotionController.getIdPromotion);
promotionRouter.delete(
  "/api/delete/promo/:_id",
  promotionController.deleteOnePromo
);
promotionRouter.delete(
  "/api/delete/all/promo",
  promotionController.deleteAllPromo
);
promotionRouter;
module.exports = promotionRouter;
