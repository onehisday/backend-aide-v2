const regulationAgentModel = require("../../Models/regulationAgent.model");

const regulationAgentController = {
    createRegulationAgent: async (req, res) => {
        try {
            const save = await new regulationAgentModel({
                minimum: req.body.minimum,
            }).save();
            return res.status(200).json({
                success: true,
                data: save,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    updateRegulationAgent: async (req, res) => {
        try {
            const findRegulationAgent =
                await regulationAgentModel.findOneAndUpdate(
                    { _id: req.params._id },
                    { minimum: req.body.minimum, updatedAt: new Date() },
                    { new: true }
                );
            return res.status(200).json({
                success: true,
                data: findRegulationAgent,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getAllRegulationAgent: async (req, res) => {
        try {
            const find = await regulationAgentModel.find();
            return res.status(200).json({
                success: true,
                data: find,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
module.exports = regulationAgentController;
