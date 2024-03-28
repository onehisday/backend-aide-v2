const express = require("express");
const settingRouter = express.Router();
const multer = require("multer");
const settingController = require("../Controllers/setting.controller");
const {
  uploadMultiple,
  upload,
} = require("../../middleware/firebase.middleware");

const uploadd = multer({ dest: "uploads/" });
//const uploadMiddleware = require("../../middleware/firebase.middleware");
settingRouter.post(
  "/api/create/setting",
  uploadd.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),
  settingController.saveSetting
);
settingRouter.get("/api/all/setting", settingController.getAllSetting);
settingRouter.get("/api/all/setting/:_id", settingController.getIdSetting);
settingRouter.put(
  "/api/update/setting/:_id",
  uploadd.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),
  settingController.putSetting
);
module.exports = settingRouter;
