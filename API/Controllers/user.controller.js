const refSystemModel = require("../../Models/refSystem.model");
const userModel = require("../../Models/user.model");
const hrefController = require("../Controllers/href.controller");
const userController = {
    saveUser: async (req, res, next) => {
        try {
            const address = req.body.address;
            const findAddress = await userModel.findOne({ address: address });
            if (findAddress) {
                return res.status(409).json({
                    sucess: false,
                    message: "Existing address on database!",
                });
            }
            const linkRef = await hrefController.createHref(address);
            const newUser = new userModel({
                address: address,
                linkRef: linkRef,
            });
            const saveNewUser = await newUser.save();
            return res.status(200).json({
                success: true,
                data: saveNewUser,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    getAllUser: async (req, res, next) => {
        try {
            const findUser = await userModel.find();
            console.log(findUser);
            return res.status(200).json({
                sucess: true,
                data: findUser,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    getIdUser: async (req, res, next) => {
        try {
            const findIdUser = await userModel.findOne({ _id: req.params._id });
            if (findIdUser) {
                return res.status(200).json({
                    sucess: true,
                    data: findIdUser,
                });
            } else {
                return res.status(404).json({
                    sucess: false,
                    message: "The address not found!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    getUserAddress: async (req, res, next) => {
        try {
            const findIdUser = await userModel.findOne({
                address: req.params._id,
            });
            if (findIdUser) {
                return res.status(200).json({
                    sucess: true,
                    data: findIdUser,
                });
            } else {
                return res.status(404).json({
                    sucess: false,
                    message: "The address not found!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    updateTotalReward: async (result, total) => {
        // console.log("result:", result);
        const find = result.forEach(async (result) => {
            const user = await refSystemModel.findOne({ level: result.level });
            let totalRewardNew;
            if (user) {
                const findUser = await userModel.findOne({
                    address: result.address,
                });
                // console.log("findUser:", findUser);
                totalRewardNew =
                    findUser.totalReward + (user.income * total) / 100;
                // console.log("totalReward:", totalRewardNew);
                // await findUser.save();
                await userModel.findOneAndUpdate(
                    { address: findUser.address },
                    { totalReward: totalRewardNew },
                    { new: true }
                );
            }
        });
        return true;
    },
    updateTotalAgent: async (results, total, percent) => {
        for (const result of results) {
            console.log("result:", result);
            const user = await userModel.findOne({ address: result });
            // if (user && user.totalRewardAgent) {
            console.log("=========================");
            const totalReward = user.totalRewardAgent + total * percent;
            console.log("totalReward:", totalReward);
            user.totalRewardAgent = totalReward;
            await user.save();
            // }
        }
        return true;
    },
};
module.exports = userController;
