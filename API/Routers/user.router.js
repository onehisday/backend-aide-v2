const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/user.controller");
const tokenMiddleware = require("../../middleware/token.middleware");
userRouter.post("/api/save/user", userController.saveUser);
userRouter.get("/api/all/user", userController.getAllUser);
userRouter.get("/api/user/:_id", userController.getIdUser);
module.exports = userRouter;
