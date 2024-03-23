const walletModel = require("../../Models/wallet.model");
const walletController = {
  createWallet: async (req, res, next) => {
    try {
      const addressWallet = req.body.addressWallet;
      const findAddressWallet = await walletModel.findOne({
        addressWallet: addressWallet,
      });
      if (findAddressWallet) {
        return res.status(409).json({
          message: "Address wallet is existing!",
        });
      }
      const newWallet = new walletModel({
        addressWallet: addressWallet,
      });
      const saveNewWallet = await newWallet.save();
      return res.status(200).json({
        sucess: true,
        data: saveNewWallet,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  updateWallet: async (req, res, next) => {
    try {
      const conditionUpdateWallet = await walletModel.findOne({
        _id: req.params._id,
      });
      if (!conditionUpdateWallet) {
        return res.status(404).json({
          sucess: false,
          message: "Adress wallet not found!",
        });
      }
      const updatedDataWallet = {
        addressWallet: req.body.addressWallet,
      };
      //console.log("updatedDataWallet:", updatedDataWallet);
      const updateWallet = await walletModel.findOneAndUpdate(
        conditionUpdateWallet,
        updatedDataWallet,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated address wallet successfully!",
        data: updateWallet,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getAllWallet: async (req, res, next) => {
    try {
      const findAllWallet = await walletModel.find();
      return res.status(200).json({
        sucess: true,
        data: findAllWallet,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  deleteWallet: async (req, res, next) => {
    try {
      const findWallet = await walletModel.findByIdAndDelete(req.params._id);
      if (findWallet) {
        return res.status(200).json({
          sucess: true,
          message: "The wallet is deleted!",
        });
      } else {
        return res.status(404).json({
          sucess: false,
          message: "The wallet not found!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getIdWallet: async (req, res, next) => {
    try {
      const findIdWallet = await walletModel.findOne({ _id: req.params._id });
      return res.status(200).json({
        sucess: true,
        data: findIdWallet,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = walletController;
