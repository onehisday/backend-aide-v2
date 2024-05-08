const userModel = require("../../Models/user.model");

const quantityChildControler = {
    updateQuantityChild: async (addressGrand) => {
        const findAddress = await userModel.findOne({ address: addressGrand });
        // console.log(findAddress);
        // console.log(123);
        // console.log(findAddress.totalReward);
        findAddress.quantityChild += 1;
        const total = await findAddress.save();
        console.log("total:", total);
        return {
            message: `Updated total child by ${findAddress._id} successfully!`,
        };
    },
};
module.exports = quantityChildControler;
