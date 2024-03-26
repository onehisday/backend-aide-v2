const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historyClaimNodeSchema = new Schema(
  {
    addressWallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    rewardNode: {
      type: Number,
    },
    state: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const historyClaimNodeModel = mongoose.model(
  "historyClaimNode",
  historyClaimNodeSchema
);
module.exports = historyClaimNodeModel;
