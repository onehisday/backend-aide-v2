const express = require("express");
const levelOrderRouter = express.Router();
const levelOrderController = require("../../API/Controllers/levelOrder.controller");

levelOrderRouter.post(
    "/api/save/level/order",
    levelOrderController.createLevelOrder
);
levelOrderRouter.put(
    "/api/update/level/order/:_id",
    levelOrderController.updateLevelOrder
);
levelOrderRouter.get(
    "/api/all/level/order",
    levelOrderController.getAllLevelOrder
);
levelOrderRouter.get(
    "/api/level/order/:_id",
    levelOrderController.getByIdLevelOrder
);
levelOrderRouter.delete(
    "/api/delete/level/order/:_id",
    levelOrderController.deleteLevelOrder
);

module.exports = levelOrderRouter;
