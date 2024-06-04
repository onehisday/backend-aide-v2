const hrefModel = require("../../Models/href.model");

const userModel = require("../../Models/user.model");

const commissionAgentController = {
    rewardAgent: async (Address) => {
        console.log("+++++++++++++++++++++++");
        const address = Address;
        let currentAddress = address;
        let reward = await commissionAgentController.processRewardAgent(
            currentAddress
        );
        // let level = 0;
        let results = [];
        while (reward !== null) {
            // let reward = await commissionAgentController.processRewardAgent(
            //     currentAddress
            // );
            // if (reward === null) {
            //     break;
            // }
            const find = await userModel.findOne({
                address: reward,
                isAgent: true,
            });
            if (find) {
                // level++;
                // results.push({ address: reward, level: level });
                results.push(reward);
                currentAddress = reward;
                console.log("reward:", reward);
                // reward = await commissionAgentController.processRewardAgent(
                //     currentAddress
                // );
                // console.log("reward:", reward);
            } else {
                currentAddress = reward;
            }
            reward = await commissionAgentController.processRewardAgent(
                currentAddress
            );
        }
        // currentAddress = reward;
        // reward = await commissionAgentController.processRewardAgent(
        //     currentAddress
        // );
        // console.log("reward:", reward);
        return results;
    },
    // return results
    // },
    processRewardAgent: async (address) => {
        const findHref = await hrefModel.findOne({ addressChild: address });
        console.log("findHref:", findHref);
        if (findHref) {
            const find = await userModel.findOne({
                _id: findHref.addressGrand,
            });
            return find.address;
        } else {
            return null;
        }
    },
    order: async (req, res) => {
        try {
            const address = req.body.address;
            console.log(address);
            const result = await commissionAgentController.rewardAgent(address);
            return res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    getLevelAndBonus: async (amount) => {
        let level;
        let bonusRate;
        if (amount <= 50000) {
            (level = 1), (bonusRate = 0.05);
        } else if (amount <= 200000) {
            (level = 2), (bonusRate = 0.1);
        } else {
            (level = 3), (bonusRate = 0.15);
        }
        return { level, bonusRate };
    },
};
module.exports = commissionAgentController;
