const claimRewardModel = require("../../Models/claimReward.model");
const withdrawModel = require("../../Models/withdraw.model");

const claimRewardController = {
    updateStatus: async (req, res) => {
        try {
            const _id = req.params._id;
            const status = req.body.status;
            const updateReward = await claimRewardModel.findOneAndUpdate(
                { _id: _id },
                { status: status },
                { new: true }
            );
            const updateStatus = await withdrawModel.updateMany(
                {},
                { $set: { status: status } }
            );
            return res.status(200).json({
                success: true,
                message: "Update status successfully.",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    postReward: async (req, res, next) => {
        try {
            const newClaim = new claimRewardModel({});
            const saveClaim = await newClaim.save();
            return res.status(200).json({
                success: true,
                data: saveClaim,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
module.exports = claimRewardController;
