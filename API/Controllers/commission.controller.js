const commissionModel = require("../../Models/commission.model");
const commissionController = {
  createCommission: async (req, res, next) => {
    try {
      const percent = req.body.percent;
      const price = req.body.price;
      const newCommission = new commissionModel({
        percent: percent,
        price: price,
      });
      const saveCommission = await newCommission.save();
      return res.status(200).json({
        sucess: true,
        data: saveCommission,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  updateCommission: async (req, res, next) => {
    try {
      const existingCommission = await commissionModel.findOne({
        _id: req.params._id,
      });
      if (!existingCommission) {
        res.status(404).json({
          sucess: false,
          message: "The commission not found!",
        });
      }
      const updatedDataCommission = {
        price: req.body.price,
        percent: req.body.percent,
      };
      const conditionCommission = {
        _id: req.params._id,
      };
      const updatedCommission = await commissionModel.findOneAndUpdate(
        conditionCommission,
        updatedDataCommission,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated Commission successfully!",
        data: updatedCommission,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllCommission: async (req, res, next) => {
    try {
      const findAllCommission = await commissionModel.find();
      return res.status(200).json({
        sucess: true,
        data: findAllCommission,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getIdCommission: async (req, res, next) => {
    try {
      const findIdCommission = await commissionModel.findOne({
        _id: req.params._id,
      });
      return res.status(200).json({
        sucess: true,
        data: findIdCommission,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = commissionController;
