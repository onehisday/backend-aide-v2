const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    addressFrom: {
      type: String,
    },
    addressTo: {
      type: String,
    },
    value: {
      type: Number,
    },
    transactionHash: {
      type: String,
    },
    tier: {
      // type: Number,
      type: mongoose.Schema.Types.ObjectId,
      ref: "tier",
    },
  },
  { timestamps: true }
);
const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
