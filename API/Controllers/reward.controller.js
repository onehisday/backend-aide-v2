const rewardModel = require("../../Models/reward.model");
const orderModel = require("../../Models/order.model");
const detailOrderModel = require("../../Models/detailOrder.model");
const rewardController = {
  postReward: async (req, res, next) => {
    try {
      const newReward = new rewardModel({
        quantityCoin: req.body.quantityCoin,
        setTime: req.body.setTime,
      });
      const saveReward = await newReward.save();
      return res.status(200).json({
        sucess: true,
        data: saveReward,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getByIdReward: async (req, res, next) => {
    try {
      const findIdReward = await rewardModel.findOne({ _id: req.params._id });
      if (findIdReward) {
        return res.status(200).json({
          sucess: true,
          data: findIdReward,
        });
      } else {
        return res.status(404).json({
          sucess: false,
          message: "The Id Reward not found!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllReward: async (req, res, next) => {
    try {
      const findAllReward = await rewardModel.find();
      return res.status(200).json({
        sucess: true,
        data: findAllReward,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  updateReward: async (req, res, next) => {
    try {
      const findIdReward = await rewardModel.findOne({ _id: req.params._id });
      if (!findIdReward) {
        return res.status(404).json({
          sucess: false,
          message: "The Id reward not found!",
        });
      }
      const conditionReward = {
        _id: req.params._id,
      };
      const updatedDataReward = {
        quantityCoin: req.body.quantityCoin,
        setTime: req.body.setTime,
        status: req.body.status,
      };
      const updatedReward = await rewardModel.findOneAndUpdate(
        conditionReward,
        updatedDataReward,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated setTime and quantityCoin successfully!",
        data: updatedReward,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  calculateTotalRewardByUser: async (userAddress) => {
    console.log(123);
    const findOrderByUser = await orderModel
      .find({ address: userAddress })
      .populate({ path: "detail" });

    console.log("finds:", findOrderByUser);
    if (findOrderByUser.length === 0) {
      return 0;
    }
    let totalReward = 0;
    for (const i of findOrderByUser) {
      console.log(456);
      for (const a of i.detail) {
        totalReward += a.reward;
      }
    }
    console.log("totalReward:", totalReward);
    return totalReward;
  },
};
module.exports = rewardController;
