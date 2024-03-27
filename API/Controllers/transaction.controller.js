const transactionModel = require("../../Models/transaction.model");
const transactionController = {
  getAllTransaction: async (req, res, next) => {
    try {
      const findTransaction = await transactionModel
        .find()
        .populate({ path: "tier" });
      return res.status(200).json({
        sucess: true,
        data: findTransaction,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
  getIdTransaction: async (req, res, next) => {
    try {
      const findTransactionId = await transactionModel
        .findOne({ _id: req.params._id })
        .populate({ path: "tier" });
      return res.status(200).json({
        sucess: true,
        data: findTransactionId,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        message: error.message,
      });
    }
  },
};
module.exports = transactionController;
