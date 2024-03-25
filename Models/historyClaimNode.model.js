const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historyClaimNodeSchema = new Schema(
  {
    addressWallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    commissionReward: {
      type: Number,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

const historyClaimNodeModel = mongoose.model(
  "historyClaimNode",
  historyClaimNodeSchema
);
module.exports = historyClaimNodeModel;
