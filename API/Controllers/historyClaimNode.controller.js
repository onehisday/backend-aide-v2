const historyClaimNodeModel = require("../../Models/historyClaimNode.model");
const userModel = require("../../Models/user.model");
const orderModel = require("../../Models/order.model");
const detailOrder = require("../../Models/detailOrder.model");
const detailOrderModel = require("../../Models/detailOrder.model");

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
      const findOrder = await orderModel
        .find({ address: addressWallet })
        .populate({ path: "detail" });
      //console.log("findOrder:", findOrder);
      for (let i = 0; i < findOrder.length; i++) {
        const order = findOrder[i];
        console.log("order:", order);
        for (let j = 0; j < order.detail.length; j++) {
          console.log("set:", order.detail[j]);
          const idDetail = order.detail[j]._id;
          const updateReward = await detailOrderModel.findOneAndUpdate(
            { _id: idDetail },
            { $set: { reward: 0 } },
            { new: true }
          );
        }
      }
      //console.log("Rewards set to zero successfully!");
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
      const findUser = await userModel.findOne({ address: req.params._id });
      console.log(findUser);
      const idUser = findUser._id;
      const findByWalletAddress = await historyClaimNodeModel.find({
        addressWallet: idUser,
      });
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
  putHistoryClaimNode: async (req, res, next) => {
    try {
      const findHistoryNode = await historyClaimNodeModel.findOne({
        _id: req.params._id,
      });
      if (!findHistoryNode) {
        return res.status(404).json({
          sucess: false,
          message: "The Id history claim node not found!",
        });
      }
      const conditionNode = {
        _id: req.params._id,
      };
      const updatedDataNode = {
        state: req.body.state,
      };
      const updatedNode = await historyClaimNodeModel.findOneAndUpdate(
        conditionNode,
        updatedDataNode,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated state successfully!",
        data: updatedNode,
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
