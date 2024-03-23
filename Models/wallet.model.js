const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema(
  {
    addressWallet: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const walletModel = mongoose.model("wallet", walletSchema);
module.exports = walletModel;
