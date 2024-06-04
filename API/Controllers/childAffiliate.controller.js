const hrefModel = require("../../Models/href.model");
const levelOrderModel = require("../../Models/levelOrder.model");
const levelRefModel = require("../../Models/levelRef.model");
const userModel = require("../../Models/user.model");

const childAffiliateController = {
    reward: async (Address) => {
        const address = Address;
        const currentAddress = address;
        const findUser = await userModel.findOne({ address: currentAddress });
        const findHref = await hrefModel.find({ addressGrand: findUser._id });
        // let reward = await childAffiliateController.processReward(
        //     currentAddress
        // );
        let children = [];
        for (const ref of findHref) {
            children.push(ref.addressChild);
            const grandChild = await childAffiliateController.reward(
                ref.addressChild
            );
            children = children.concat(grandChild);
        }
        return children;
    },
    order: async (req, res) => {
        try {
            // const address = req.body.address;
            // console.log(address);
            const result = await childAffiliateController.checkLevel();
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
    checkLevel: async (id) => {
        let currentLevel = 1;
        while (true) {
            const levelOrder = await levelOrderModel.findOne({
                level: currentLevel,
            });
            const levelRef = await levelRefModel.findOne({
                level: currentLevel,
            });
            if (!levelOrder || !levelRef) {
                break;
            }
            if (levelOrder.user.includes(id) || levelRef.user.includes(id)) {
                return false;
            }
            if (levelOrder.isLevel === true && levelRef.isLevel === true) {
                return { currentLevel, levelOrder, levelRef };
            } else if (levelRef.isLevel === true) {
                return { currentLevel, levelRef };
            } else if (levelOrder.isLevel === true) {
                return { currentLevel, levelOrder };
            } else {
                currentLevel++;
            }
        }
        return currentLevel;
    },
};
module.exports = childAffiliateController;
