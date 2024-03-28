const historyClaimNodeModel = require("../../Models/historyClaimNode.model");
const userModel = require("../../Models/user.model");

const claimNodeController = {
  claimNode: async (req, res, next) => {
    try {
      const rewardNode = req.body.rewardNode;
      const addressWallet = req.body.addressWallet;
      const findAddress = await userModel.findOne({ address: addressWallet });
      if (!findAddress) {
        return res.status(404).json({
          sucess: false,
          message: "The user address not found!",
        });
      }
      const newClaimNode = new historyClaimNodeModel({
        rewardNode: rewardNode,
        addressWallet: findAddress._id,
      });
      const saveNewClaimNode = await newClaimNode.save();
      const updatedTotalReward = await userModel.findOneAndUpdate(
        {
          address: addressWallet,
        },
        {
          $set: {
            totalReward: 0,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        sucess: true,
        data: saveNewClaimNode,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllHistoryClaimNode: async (req, res, next) => {
    try {
      const historyClaimNode = await historyClaimNodeModel
        .find()
        .populate({ path: "addressWallet" });
      return res.status(200).json({
        sucess: true,
        data: historyClaimNode,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getIdHistoryClaimNode: async (req, res, next) => {
    try {
      const findById = await historyClaimNodeModel
        .findById({ _id: req.params._id })
        .populate({ path: "addressWallet" });
      if (!findById) {
        return res.status(404).json({
          sucess: false,
          message: "The id history claim node not found!",
        });
      }
      return res.status(200).json({
        sucess: true,
        data: findById,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getIdWalletAddress: async (req, res, next) => {
    try {
      const findByWalletAddress = await historyClaimNodeModel
        .findOne({ addressWallet: req.params._id })
        .populate({ path: "addressWallet" });
      if (!findByWalletAddress) {
        return res.status(404).json({
          sucess: false,
          message: "The id address wallet not found!",
        });
      }
      return res.status(200).json({
        sucess: true,
        data: findByWalletAddress,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};

module.exports = claimNodeController;
