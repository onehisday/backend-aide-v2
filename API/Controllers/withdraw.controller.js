const withdrawModel = require("../../Models/withdraw.model");
const userModel = require("../../Models/user.model");
const { default: mongoose } = require("mongoose");

const withdrawController = {
    saveDrawUser: async (req, res) => {
        try {
            const id_user = req.body.id_user;
            const amount = req.body.amount;
            const findUser = await userModel.findOne({ _id: id_user });
            if (amount >= findUser.totalReward) {
                return res.status(409).json({
                    success: false,
                    message: "Not enough balance withdraw!",
                });
            }
            const newWithdraw = new withdrawModel({
                id_user: findUser._id,
                amount: amount,
            });
            const saveDraw = await newWithdraw.save();
            const updateTotalReward = await userModel.findOneAndUpdate(
                { _id: findUser._id },
                { totalReward: findUser.totalReward - amount },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                data: saveDraw,
                message: "Withdraw successfully.",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getHistoryWithdraw: async (req, res) => {
        try {
            const id_user = req.params.id_user;
            if (!mongoose.Types.ObjectId.isValid(id_user)) {
                return res.status(404).json({
                    success: false,
                    message: `The user with ID ${id_user} not found!`,
                });
            }
            const historyWithdraw = await withdrawModel.findOne({
                id_user: id_user,
            });
            if (!historyWithdraw) {
                return res.status(404).json({
                    success: false,
                    message: `The user with ID ${id_user} not found!`,
                });
            }
            return res.status(200).json({
                success: true,
                data: historyWithdraw,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getAllHistoryWithdraw: async (req, res) => {
        try {
            const getAllHistoryWithdraw = await withdrawModel.find();
            return res.status(200).json({
                success: true,
                data: getAllHistoryWithdraw,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
module.exports = withdrawController;