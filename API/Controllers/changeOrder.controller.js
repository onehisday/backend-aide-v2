const changeOrderModel = require("../../Models/changeOrder.model");
const tierModel = require("../../Models/tier.model");
const promotionModel = require("../../Models/promotion.model");
const transactionModel = require("../../Models/transaction.model");
const hrefController = require("./href.controller");
const userController = require("./user.controller");
const userModel = require("../../Models/user.model");

const changeOrderController = {
    createOrder: async (req, res) => {
        try {
            console.log(3456789);
            const address = req.body.address;
            const promoCode = req.body.promoCode;
            const tier = parseInt(req.body.tier);
            const addressFrom = req.body.from;
            const addressTo = req.body.to;
            const value = req.body.value;
            const transactionHash = req.body.transactionHash;
            const quantity = 1;
            if (addressFrom === "" && addressTo === "" && value === "") {
                return res.status(422).json({
                    success: false,
                    message: "Invalid transaction!",
                });
            }
            const findTier = await tierModel.findOne({ tier: tier });
            if (promoCode.trim() === "") {
                const totalUnPromo = findTier.ethCost;
                const newTransaction = new transactionModel({
                    addressFrom: addressFrom,
                    addressTo: addressTo,
                    value: value,
                    transactionHash: transactionHash,
                    tier: findTier._id,
                });
                const saveNewTransaction = await newTransaction.save();
                const order = new changeOrderModel({
                    address: address,
                    tier: findTier._id,
                    total: totalUnPromo,
                    promoCode: promoCode,
                    idTransaction: saveNewTransaction._id,
                });
                const saveOrder = await order.save();
                const updateRefSystem = await hrefController.reward(
                    saveOrder.address
                );
                //console.log("updateRefSystem:", updateRefSystem);
                if (updateRefSystem.length !== 0) {
                    console.log("++++++++++++++++++++++");
                    const update = await userController.updateTotalReward(
                        updateRefSystem,
                        saveOrder.total
                    );
                }

                const updateCountTier = await tierModel.findOneAndUpdate(
                    {
                        tier: tier,
                    },
                    {
                        $inc: {
                            count: quantity,
                        },
                    },
                    {
                        new: true,
                    }
                );
                // const findOrder = await changeOrderModel.find({
                //     address: saveOrder.address,
                // });
                // const totalSum = findOrder.reduce(
                //     (acc, order) => acc + order.total,
                //     0
                // );
                // await userModel.findOneAndUpdate(
                //     { address: saveOrder.address },
                //     { $set: { totalOrder: totalSum } }
                // );
                return res.status(200).json({
                    success: true,
                    data: saveOrder,
                });
            }
            const findPromo = await promotionModel.findOne({
                promoCode: promoCode,
            });
            const totalUnPromo = findTier.ethCost;
            const totalPromo =
                totalUnPromo - (totalUnPromo * findPromo.percent) / 100;
            const newTransaction = new transactionModel({
                addressFrom: addressFrom,
                addressTo: addressTo,
                value: value,
                transactionHash: transactionHash,
                tier: findTier._id,
            });
            const saveNewTransaction = await newTransaction.save();
            const order = new changeOrderModel({
                address: address,
                tier: findTier._id,
                total: totalPromo,
                promoCode: promoCode,
                idTransaction: saveNewTransaction._id,
            });
            const saveOrder = await order.save();
            const updateRefSystem = await hrefController.reward(
                saveOrder.address
            );
            if (updateRefSystem.length !== 0) {
                //console.log("++++++++++++++++++++++");
                const update = await userController.updateTotalReward(
                    updateRefSystem,
                    saveOrder.total
                );
            }
            const updateQuantityPromoCode =
                await promotionModel.findOneAndUpdate(
                    {
                        promoCode: promoCode,
                    },
                    {
                        $set: {
                            isPromo: true,
                        },
                    },
                    { new: true }
                );
            const updateCountTier = await tierModel.findOneAndUpdate(
                {
                    tier: tier,
                },
                {
                    $inc: {
                        count: quantity,
                    },
                },
                {
                    new: true,
                }
            );
            // const findOrder = await changeOrderModel.find({
            //     address: saveOrder.address,
            // });
            // const totalSum = findOrder.reduce(
            //     (acc, order) => acc + order.total,
            //     0
            // );
            // await userModel.findOneAndUpdate(
            //     { address: saveOrder.address },
            //     { $set: { totalOrder: totalSum } }
            // );
            return res.status(200).json({
                success: true,
                data: saveOrder,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    allOrderByAddress: async (req, res) => {
        try {
            const findOrderByUser = await changeOrderModel
                .find({
                    address: req.params._id,
                })
                .populate({ path: "idTransaction" })
                .populate({ path: "tier" })
                .sort({ createAt: -1 });
            return res.status(200).json({
                success: true,
                data: findOrderByUser,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    allOrderById: async (req, res, next) => {
        try {
            const findOrder = await orderModel
                .findOne({ _id: req.params._id })
                .populate({
                    path: "tier",
                })
                .populate({ path: "idTransaction" });
            return res.status(200).json({
                success: true,
                data: findOrder,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    allOrder: async (req, res, next) => {
        try {
            const findAllOrder = await orderModel
                .find()
                .populate({
                    path: "tier",
                })
                .populate({ path: "idTransaction" });
            return res.status(200).json({
                success: true,
                data: findAllOrder,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
module.exports = changeOrderController;
