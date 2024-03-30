const express = require("express");
const userAdminRouter = express.Router();
const userAdminController = require("../Controllers/userAdmin.controller");

userAdminRouter.post("/api/create/admin", userAdminController.createUserAdmin);
userAdminRouter.put(
  "/api/update/admin/:_id",
  userAdminController.updateUserAdmin
);
userAdminRouter.delete(
  "/api/delete/admin/:_id",
  userAdminController.deleteUserAdmin
);
userAdminRouter.get("/api/admin/:_id", userAdminController.getByIdUser);
userAdminRouter.get("/api/all/admin", userAdminController.getAllAdmin);
module.exports = userAdminRouter;
