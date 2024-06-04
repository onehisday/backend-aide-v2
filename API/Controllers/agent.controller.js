const regulationAgentModel = require("../../Models/regulationAgent.model");
const orderModel = require("../../Models/order.model");
const hrefModel = require("../../Models/href.model");
const userModel = require("../../Models/user.model");
const secondBranchModel = require("../../Models/secondBrand.model");

const agentController = {
    reviewAgent: async (req, res) => {
        try {
            const id_Agent = req.body.address;
            // const findOrderAgent = await orderModel.aggregate([
            //     { $match: { address: id_Agent } },
            //     { $group: { _id: null, totalSum: { $sum: "$total" } } },
            // ]);
            // const total =
            //     findOrderAgent.length > 0 ? findOrderAgent[0].totalSum : 0;
            const [
                findUser,
                findOrderAgent,
                findRegulationAgent,
                findSecondBranch,
            ] = await Promise.all([
                userModel.findOne({ address: id_Agent }),
                orderModel.find({ address: id_Agent }),
                regulationAgentModel.find(),
                secondBranchModel.find(),
            ]);
            // const findOrderAgent = await orderModel.find({ address: id_Agent });
            // const findRegulationAgent = await regulationAgentModel.find();
            let sumTotal = 0;
            for (let order of findOrderAgent) {
                sumTotal += Number(order.total);
            }
            // if (sumTotal < findRegulationAgent[0].minimum) {
            //     return res.status(400).json({
            //         success: false,
            //         message:
            //             "The total application amount is not enough for the minimum requirement.",
            //     });
            // }
            const findHref = await hrefModel.find({
                addressGrand: findUser._id,
            });
            console.log("findHref:", findHref);
            let allProcessedAddresses = [];
            const processHref = async (href, processedAddresses) => {
                processedAddresses.push(href.addressChild);
                const findUser = await userModel.findOne({
                    address: href.addressChild,
                });
                const childHrefs = await hrefModel.find({
                    addressGrand: findUser._id,
                });
                for (let childHref of childHrefs) {
                    await processHref(childHref, processedAddresses);
                }
            };
            for (let href of findHref) {
                let processedAddresses = [];
                await processHref(href, processedAddresses);
                allProcessedAddresses.push(processedAddresses);
            }

            console.log("Processed Addresses:", allProcessedAddresses);
            let totals = [];
            for (let addressArray of allProcessedAddresses) {
                console.log("Processing array:", addressArray);
                let totalOrderAmount = 0;
                for (let address of addressArray) {
                    const order = await orderModel.aggregate([
                        { $match: { address: address } },
                        { $group: { _id: null, total: { $sum: "$total" } } },
                    ]);
                    if (order.length > 0) {
                        totalOrderAmount += order[0].total;
                    }
                }
                totals.push(totalOrderAmount);
                console.log(
                    `Total order amount for array: ${totalOrderAmount}`
                );
            }
            console.log(totals);
            if (
                Number(Math.max(...totals)) <
                Number(findRegulationAgent[0].minimum)
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "The total application amount is not enough for the minimum requirement.",
                });
            }
            const fiftyPercentOfMax =
                findSecondBranch[0].percent * (Math.max(...totals) / 100);
            console.log("fiftyPercent:", fiftyPercentOfMax);
            for (let num of totals) {
                if (num !== Math.max(...totals) && num < fiftyPercentOfMax) {
                    isEnough = false;
                    return res.status(400).json({
                        success: false,
                        message: "Sub-branches are not qualified to be agents.",
                    });
                }
            }
            findUser.isAgent = true;
            await findUser.save();
            return res.status(200).json({
                success: true,
                message: "Qualified to be an agent.",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
module.exports = agentController;
