const express = require("express");
const regulationAgentRouter = express.Router();
const regulationAgentController = require("../Controllers/regulationAgent.controller");

regulationAgentRouter.post(
    "/api/save/regulation/agent",
    regulationAgentController.createRegulationAgent
);
regulationAgentRouter.put(
    "/api/update/regulation/agent/:_id",
    regulationAgentController.updateRegulationAgent
);
regulationAgentRouter.get(
    "/api/all/agent",
    regulationAgentController.getAllRegulationAgent
);

module.exports = regulationAgentRouter;
