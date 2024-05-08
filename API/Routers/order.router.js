const express = require("express");
const orderRouter = express.Router();
const orderController = require("../../API/Controllers/order.controller");

orderRouter.post("/api/create/order", orderController.createOrder);
orderRouter.get(
    "/api/order/by/address/:_id",
    orderController.allOrderByAddress
);
orderRouter.get("/api/all/order/:_id", orderController.allOrderById);
orderRouter.get(
    "/api/all/order",

    orderController.allOrder
);
// orderRouter.get("/api/page/:_id", orderController.orderPagination);
module.exports = orderRouter;
