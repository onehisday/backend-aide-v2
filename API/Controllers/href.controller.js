const userModel = require("../../Models/user.model");
const hrefModel = require("../../Models/href.model");
const orderModel = require("../../Models/order.model");
const commissionModel = require("../../Models/commission.model");
const quantityChildControler = require("../Controllers/quantityChild.controller");
// const { find } = require("../../Models/reward.model");
const hrefController = {
    createHref: async (address) => {
        const domain = process.env.domain;
        return `https://${domain}?ref=${address}`;
    },
    findAddress: async (req, res, next) => {
        try {
            const find = req.params._id;
            const findAddress = await hrefModel
                .findOne({ addressGrand: find })
                .populate({
                    path: "addressGrand",
                });
            return res.status(200).json({
                data: findAddress,
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
    rewardRefGrand: async (req, res, next) => {
        try {
            const addressGrand = req.params._id;
            const findIdGrand = await userModel.findOne({
                address: addressGrand,
            });
            const findGrand = await hrefModel.find({
                addressGrand: findIdGrand._id,
            });
            //console.log("findGrand:", findGrand);
            const totalChildByGrand = findGrand.length;
            //console.log(totalChildByGrand);
            const mapChild = await Promise.all(
                findGrand.map(async (a) => {
                    const findChild = await orderModel.find({
                        address: a.addressChild,
                    });
                    //console.log("findChild:", findChild);
                    const totalQuantity = findChild.reduce((total, order) => {
                        // console.log("quantity:", order.quantity);
                        return total + order.quantity;
                    }, 0);
                    //console.log("total:", totalQuantity);

                    return totalQuantity;
                })
            );
            const reduceTotal = mapChild.reduce(
                (total, quantity) => total + quantity,
                0
            );
            const findRose = await commissionModel.findOne({ status: null });
            const totalRose = reduceTotal * findRose.price * findRose.percent;
            console.log("totalRose:", totalRose);
            return res.status(200).json({
                success: true,
                reward: totalRose,
                data: totalChildByGrand,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getAllGrandChild: async (req, res, next) => {
        try {
            const findGrandChild = await hrefModel
                .find()
                .populate({ path: "addressGrand" });
            return res.status(200).json({
                success: true,
                data: findGrandChild,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    saveHref: async (req, res, next) => {
        try {
            const addressGrand = req.body.referralCode;
            //console.log("addressGrand:", addressGrand);
            const addressChild = req.body.walletAddress;
            //console.log("addressChild:", addressChild);
            const grandUser = await userModel.findOne({
                address: addressGrand,
            });
            if (!grandUser) {
                return res.status(404).json({
                    success: false,
                    message: "Address not found!",
                });
            }
            const findAddressChild = await hrefModel.findOne({
                addressChild: addressChild,
            });
            if (findAddressChild) {
                return res.status(409).json({
                    success: false,
                    message: "Address child is existing!",
                });
            }
            const newGrandChild = new hrefModel({
                addressChild: addressChild,
                addressGrand: grandUser._id,
            });
            //console.log("newGrandChild:", newGrandChild);
            const saveNewGrandChild = await newGrandChild.save();
            // console.log("savenewGrandChild:", saveNewGrandChild);
            // console.log("grandUser:", grandUser._id);
            const updatedQuantityChild =
                await quantityChildControler.updateQuantityChild(
                    grandUser.address
                );
            return res.status(200).json({
                sucess: true,
                data: saveNewGrandChild,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    reward: async (Address) => {
        //const address = "0xfed95e6f6b2666c3c293ec49a47c619ca13b80ff";
        // const address = "0x33de35a98568e977b8160c5c20f7bb66b87b2a88";
        //const address = "0xD0f00Ad528EC39E1856c6dAAEDd2BE566Fcfa70";
        const address = Address;
        //const total = total;
        let currentAddress = address;
        let reward = await hrefController.rewardOrder(currentAddress);
        let level = 0;
        let results = [];
        while (reward !== null) {
            level++;
            results.push({ address: reward, level });
            currentAddress = reward;
            reward = await hrefController.rewardOrder(currentAddress);
        }
        // console.log("result:", results);
        return results;
    },
    rewardOrder: async (address) => {
        // console.log(123);
        const findHref = await hrefModel.findOne({ addressChild: address });
        // console.log("findHref:", findHref);
        if (findHref) {
            const find = await userModel.findOne({
                _id: findHref.addressGrand,
            });
            // console.log("find:", find);
            // console.log(find.address);
            return find.address;
        } else {
            return null;
        }
    },
};
module.exports = hrefController;
