const express = require("express");
const levelRefRouter = express.Router();
const levelRefController = require("../../API/Controllers/levelRef.controller");

levelRefRouter.post("/api/save/level/ref", levelRefController.createLevelRef);
levelRefRouter.get("/api/all/level/ref", levelRefController.getAllLevelRef);
levelRefRouter.get("/api/level/ref/:_id", levelRefController.getByIdLevelOrder);
// levelOrderRouter.put(
//     "/api/update/level/order/:_id",
//     levelOrderController.updateLevelOrder
// );
// levelOrderRouter.get(
//     "/api/all/level/order",
//     levelOrderController.getAllLevelOrder
// );
// levelOrderRouter.get(
//     "/api/level/order/:_id",
//     levelOrderController.getByIdLevelOrder
// );
// levelOrderRouter.delete(
//     "/api/delete/level/order/:_id",
//     levelOrderController.deleteLevelOrder
// );

module.exports = levelRefRouter;
