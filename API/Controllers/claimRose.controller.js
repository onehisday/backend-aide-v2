const claimRoseModel = require("../../Models/claimRose.model");

const claimRoseController = {
  postClaimRose: async (req, res, next) => {
    try {
      const newClaim = new claimRoseModel({});
      const saveClaim = await newClaim.save();
      return res.status(200).json({
        sucess: true,
        data: saveClaim,
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
      const findIdClaimRose = await claimRoseModel.findOne({
        _id: req.params._id,
      });
      if (!findIdClaimRose) {
        return res.status(404).json({
          sucess: false,
          message: "The Id claim rose not found!",
        });
      }
      const conditionReward = {
        _id: req.params._id,
      };
      const updatedDataClaimRose = {
        status: req.body.status,
      };
      const updatedReward = await claimRoseModel.findOneAndUpdate(
        conditionReward,
        updatedDataClaimRose,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated status claim rose successfully!",
        data: updatedReward,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllRose: async (req, res, next) => {
    try {
      const findClaimRose = await claimRoseModel.find();
      return res.status(200).json({
        sucess: true,
        data: findClaimRose,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getIdRose: async (req, res, next) => {
    try {
      const findClaimRose = await claimRoseModel.findOne({
        _id: req.params._id,
      });
      if (!findClaimRose) {
        return res.status(404).json({
          sucess: false,
          message: "The if claim commission not found!",
        });
      }
      return res.status(200).json({
        sucess: true,
        data: findClaimRose,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = claimRoseController;
