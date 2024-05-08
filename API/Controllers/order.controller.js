const orderModel = require("../../Models/order.model");
const detailOrderModel = require("../../Models/detailOrder.model");
const tierModel = require("../../Models/tier.model");
const promotionModel = require("../../Models/promotion.model");
const transactionModel = require("../../Models/transaction.model");
const userModel = require("../../Models/user.model");
const countOrderController = require("../Controllers/countOrder.controller");
const hrefController = require("./href.controller");
const userController = require("./user.controller");

const orderController = {
    createOrder: async (req, res, next) => {
        try {
            const address = req.body.address;
            const quantity = req.body.quantity;
            const promoCode = req.body.promoCode;
            const tier = parseInt(req.body.tier);
            const addressFrom = req.body.from;
            const addressTo = req.body.to;
            const value = req.body.value;
            const transactionHash = req.body.transactionHash;

            if (addressFrom === "" && addressTo === "" && value === "") {
                return res.status(422).json({
                    success: false,
                    message: "Invalid transaction!",
                });
            }
            const findTier = await tierModel.findOne({ tier: tier });
            //console.log("findTier:", findTier);
            //   const findUser = await userModel.findOne({ address: address });

            if (promoCode.trim() === "" && quantity > 1) {
                //console.log("==================");
                const detailOrders = [];
                for (let i = 0; i < quantity; i++) {
                    const newDetail = new detailOrderModel({
                        tier: findTier._id,
                    });
                    const saveDetail = await newDetail.save();
                    detailOrders.push(saveDetail);
                }
                const totalUnPromo = findTier.ethCost * quantity;
                const totalPromo = totalUnPromo / 100;
                const newTransaction = new transactionModel({
                    addressFrom: addressFrom,
                    addressTo: addressTo,
                    value: value,
                    transactionHash: transactionHash,
                    tier: findTier._id,
                });
                const saveNewTransaction = await newTransaction.save();
                const order = new orderModel({
                    address: address,
                    detail: detailOrders.map((id) => id._id),
                    quantity: quantity,
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
                //const detailLength = saveOrder.detail.length;
                // const updateCountOrder =
                //     await countOrderController.updateCountOrder(
                //         address,
                //         detailLength
                //     );
                return res.status(200).json({
                    success: true,
                    data: saveOrder,
                });
            }

            if (promoCode.trim() === "" && quantity == 1) {
                //console.log(1);
                const newDetailOrder = new detailOrderModel({
                    tier: findTier._id,
                });
                //console.log(newDetailOrder);
                //console.log(typeof tier);
                //const save =
                await newDetailOrder.save();
                //console.log(2);
                const totalUnPromo = findTier.ethCost * quantity;
                const totalPromo = totalUnPromo / 100;
                const newElseTransaction = new transactionModel({
                    addressFrom: addressFrom,
                    addressTo: addressTo,
                    value: value,
                    transactionHash: transactionHash,
                    tier: findTier._id,
                });
                //console.log(newElseTransaction);
                const saveNewElseTransaction = await newElseTransaction.save();
                //console.log("saveNewTransaction:", saveNewElseTransaction);
                const elseOrder = new orderModel({
                    address: address,
                    detail: newDetailOrder._id,
                    quantity: quantity,
                    total: totalUnPromo,
                    promoCode: promoCode,
                    idTransaction: saveNewElseTransaction._id,
                });
                const saveElseOrder = await elseOrder.save();
                const updateRefSystem = await hrefController.reward(
                    saveElseOrder.address
                );
                console.log("updateRefSystem:", updateRefSystem);
                if (updateRefSystem.length !== 0) {
                    //console.log("++++++++++++++++++++++");
                    const update = await userController.updateTotalReward(
                        updateRefSystem,
                        saveElseOrder.total
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
                // const detailLengh = saveElseOrder.detail.length;
                // console.log("detailLength:", detailLengh);
                // const updateCount = await countOrderController.updateCountOrder(
                //     address,
                //     detailLengh
                // );
                return res.status(200).json({
                    success: true,
                    data: saveElseOrder,
                });
            }
            const findPromo = await promotionModel.findOne({
                promoCode: promoCode,
            });
            if (quantity > 1) {
                console.log(789);
                console.log("------------------------------------");
                const dertailOrders = [];
                for (let i = 0; i < quantity; i++) {
                    const newDetail = new detailOrderModel({
                        tier: findTier._id,
                    });
                    const saveDetail = await newDetail.save();
                    dertailOrders.push(saveDetail);
                }
                const totalUnPromo = findTier.ethCost * quantity;
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
                const order = new orderModel({
                    address: address,
                    detail: dertailOrders.map((id) => id._id),
                    quantity: quantity,
                    total: totalPromo,
                    promoCode: promoCode,
                    idTransaction: saveNewTransaction._id,
                });

                const saveOrder = await order.save();
                const updateRefSystem = await hrefController.reward(
                    saveOrder.address
                );
                //console.log("updateRefSystem:", updateRefSystem);
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
                // const detailLength = saveOrder.detail.length;
                // const updateCountOrder =
                //     await countOrderController.updateCountOrder(
                //         address,
                //         detailLength
                //     );
                return res.status(200).json({
                    success: true,
                    data: saveOrder,
                });
            } else {
                //console.log("0000000000000000000000");
                const newDetailOrder = new detailOrderModel({
                    tier: findTier._id,
                });
                await newDetailOrder.save();
                const totalUnPromo = findTier.ethCost * quantity;
                const totalPromo =
                    totalUnPromo - (totalUnPromo * findPromo.percent) / 100;
                const newElseTransaction = new transactionModel({
                    addressFrom: addressFrom,
                    addressTo: addressTo,
                    value: value,
                    transactionHash: transactionHash,
                    tier: findTier._id,
                });
                const saveNewElseTransaction = await newElseTransaction.save();
                const elseOrder = new orderModel({
                    address: address,
                    detail: newDetailOrder._id,
                    quantity: quantity,
                    total: totalPromo,
                    promoCode: promoCode,
                    idTransaction: saveNewElseTransaction._id,
                });
                const saveElseOrder = await elseOrder.save();
                const updateRefSystem = await hrefController.reward(
                    saveElseOrder.address
                );
                //console.log("updateRefSystem:", updateRefSystem);
                if (updateRefSystem.length !== 0) {
                    //console.log("++++++++++++++++++++++");
                    const update = await userController.updateTotalReward(
                        updateRefSystem,
                        saveElseOrder.total
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
                // const detailLengh = saveElseOrder.detail.length;
                // const updateCount = await countOrderController.updateCountOrder(
                //     address,
                //     detailLengh
                // );
                return res.status(200).json({
                    success: true,
                    data: saveElseOrder,
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    allOrderByAddress: async (req, res, next) => {
        try {
            const findOrderByUser = await orderModel
                .find({ address: req.params._id })
                .populate({
                    path: "detail",
                    populate: {
                        path: "tier",
                    },
                })
                .populate({ path: "idTransaction" })
                .sort({ createdAt: -1 });
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
                    path: "detail",
                    populate: {
                        path: "tier",
                    },
                })
                .populate({ path: "idTransaction" });
            return res.status(200).json({
                sucess: true,
                data: findOrder,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    allOrder: async (req, res, next) => {
        try {
            const findAllOrder = await orderModel
                .find()
                .populate({
                    path: "detail",
                    populate: {
                        path: "tier",
                    },
                })
                .populate({ path: "idTransaction" });
            return res.status(200).json({
                sucess: true,
                data: findAllOrder,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    // orderPagination: async (req, res, next) => {
    //     try {
    //         let perPage = 2;
    //         let page = req.params.perpage;
    //         const findOrderByUser = await orderModel
    //             .find({ address: req.params._id })
    //             .populate({ path: "detail", populate: { path: "tier" } })
    //             .populate({ path: "idTransaction" })
    //             .skip(perPage * page - perPage)
    //             .limit(perPage)
    //             .exec();
    //         const count = await orderModel.countDocuments();
    //         return res.status(200).json({
    //             sucess: true,
    //             data: {
    //                 findOrderByUser,
    //                 current: page,
    //                 pages: Math.ceil(count / perPage),
    //             },
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             sucess: false,
    //             message: error.message,
    //         });
    //     }
    // },
};
module.exports = orderController;
