const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historyClaimRoseSchema = new Schema(
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

const historyClaimRoseModel = mongoose.model(
  "historyClaimRose",
  historyClaimRoseSchema
);
module.exports = historyClaimRoseModel;
