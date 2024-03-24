const express = require("express");
const settingRouter = express.Router();
const settingController = require("../Controllers/setting.controller");
const uploadMiddleware = require("../../middleware/upload.middleware");
settingRouter.post(
  "/api/create/setting",
  uploadMiddleware.single("favicon"),
  uploadMiddleware.single("logo"),
  settingController.saveSetting
);
module.exports = settingRouter;
