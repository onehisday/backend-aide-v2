const express = require("express");
const changeOrderRouter = express.Router();
const changeOrderController = require("../../API/Controllers/changeOrder.controller");

changeOrderRouter.post(
    "/api/create/change/order",
    changeOrderController.createOrder
);
changeOrderRouter.get(
    "/api/order/change/by/address/:_id",
    changeOrderController.allOrderByAddress
);
changeOrderRouter.get(
    "/api/all/order/change/:_id",
    changeOrderController.allOrderById
);
changeOrderRouter.get(
    "/api/all/change/order",

    changeOrderController.allOrder
);
// orderRouter.get("/api/page/:_id", orderController.orderPagination);
module.exports = changeOrderRouter;
