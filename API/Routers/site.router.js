const express = require("express");
const siteRouter = express.Router();
const siteController = require("../Controllers/site.controller");

siteRouter.post("/api/login", siteController.postLogin);
module.exports = siteRouter;
