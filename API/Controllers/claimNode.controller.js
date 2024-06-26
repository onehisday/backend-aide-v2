const claimNodeModel = require("../../Models/claimNode.model");
const claimNodeController = {
    postClaimNode: async (req, res, next) => {
        try {
            const newClaimNode = new claimNodeModel({});
            const saveClaimRose = await newClaimNode.save();
            return res.status(200).json({
                success: true,
                data: saveClaimRose,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    updateClaimNode: async (req, res, next) => {
        try {
            const findClaimNode = await claimNodeModel.findOne({
                _id: req.params._id,
            });
            if (!findClaimNode) {
                return res.status(404).json({
                    success: false,
                    message: "The ID claim node not found!",
                });
            }
            const conditionNode = { _id: req.params._id };
            const updatedDataNode = { status: req.body.status };
            const updatedNode = await claimNodeModel.findOneAndUpdate(
                conditionNode,
                updatedDataNode,
                { new: true }
            );
            return res.status(200).json({
                message: "Updated status claim node successfully!",
                data: updatedNode,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    getAllNode: async (req, res, next) => {
        try {
            const findClaimNode = await claimNodeModel.find();
            return res.status(200).json({
                success: true,
                data: findClaimNode,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getIdNode: async (req, res, next) => {
        try {
            const findClaimNode = await claimNodeModel.findOne({
                _id: req.params._id,
            });
            if (!findClaimNode) {
                return res.status(404).json({
                    success: false,
                    message: "The id claim node not found!",
                });
            }
            return res.status(200).json({
                success: true,
                data: findClaimNode,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
module.exports = claimNodeController;
