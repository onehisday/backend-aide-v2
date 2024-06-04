const secondBranchModel = require("../../Models/secondBrand.model");
const secondBranchController = {
    saveSecondBranch: async (req, res) => {
        try {
            const save = await new secondBranchModel({
                percent: req.body.percent,
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
    updateSecondBranch: async (req, res) => {
        try {
            const update = await secondBranchModel.findOneAndUpdate(
                { _id: req.params._id },
                { percent: req.body.percent },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                data: update,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getAllSecondBranch: async (req, res) => {
        try {
            const find = await secondBranchModel.find();
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
module.exports = secondBranchController;
