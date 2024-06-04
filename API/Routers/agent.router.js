const express = require("express");
const agentRouter = express.Router();
const agentController = require("../Controllers/agent.controller");

agentRouter.post("/api/save/review/agent", agentController.reviewAgent);

module.exports = agentRouter;
