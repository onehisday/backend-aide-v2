const claimCommisionModel = require("../../Models/historyClaimRose.model");
const userModel = require("../../Models/user.model");
const claimCommissionController = {
  claimCommission: async (req, res, next) => {
    try {
      const commissionReward = req.body.commissionReward;
      const addressWallet = req.body.addressWallet;
      const findUserAddress = await userModel.findOne({
        address: addressWallet,
      });
      if (!findUserAddress) {
        return res.status(404).json({
          sucess: false,
          message: "The address not found!",
        });
      }
      const commission = new claimCommisionModel({
        addressWallet: findUserAddress._id,
        commsisionReward: commissionReward,
      });
      const saveClaimCommission = await commission.save();
      return res.status(200).json({
        sucess: true,
        data: saveClaimCommission,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = claimCommissionController;
