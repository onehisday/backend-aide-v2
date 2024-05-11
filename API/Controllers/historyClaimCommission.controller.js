const historyClaimRoseModel = require("../../Models/historyClaimRose.model");
const claimCommisionModel = require("../../Models/historyClaimRose.model");
const userModel = require("../../Models/user.model");
const claimCommissionController = {
    claimCommission: async (req, res, next) => {
        try {
            const commissionReward = req.body.commissionReward;
            console.log(commissionReward);
            const addressWallet = req.body.addressWallet;
            const findUserAddress = await userModel.findOne({
                address: addressWallet,
            });
            if (!findUserAddress) {
                return res.status(404).json({
                    success: false,
                    message: "The address not found!",
                });
            }
            const commission = new claimCommisionModel({
                addressWallet: findUserAddress._id,
                commissionReward: commissionReward,
            });
            const saveClaimCommission = await commission.save();
            return res.status(200).json({
                success: true,
                data: saveClaimCommission,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getAllCommission: async (req, res, next) => {
        try {
            const findAllCommission = await claimCommisionModel
                .find()
                .populate({ path: "addressWallet" });
            return res.status(200).json({
                success: true,
                data: findAllCommission,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getIdCommission: async (req, res, next) => {
        try {
            const findIdCommission = await claimCommisionModel.findOne({
                _id: req.params._id,
            });
            if (!findIdCommission) {
                return res.status(404).json({
                    success: false,
                    message: "The id history commission not found!",
                });
            }
            return res.status(200).json({
                success: true,
                data: findIdCommission,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    updateHistoryCommission: async (req, res, next) => {
        try {
            const findHistoryCommission = await historyClaimRoseModel.findOne({
                _id: req.params._id,
            });
            if (!findHistoryCommission) {
                return res.status(404).json({
                    success: false,
                    message: "The Id history claim rose not found!",
                });
            }
            const conditionCommission = {
                _id: req.params._id,
            };
            const updatedDataCommission = {
                state: req.body.state,
            };
            const updatedCommission =
                await historyClaimRoseModel.findOneAndUpdate(
                    conditionCommission,
                    updatedDataCommission,
                    { new: true }
                );
            return res.status(200).json({
                message: "Updated state successfully!",
                data: updatedCommission,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
module.exports = claimCommissionController;
