const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const changeOrderSchema = new Schema(
  {
    address: {
      type: String,
    },
    tier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tier",
    },
    total: {
      type: Number,
    },
    promoCode: {
      type: String,
    },
    idTransaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transaction",
    },
    reward: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

const changeOrderModel = mongoose.model("changeOrder", changeOrderSchema);
module.exports = changeOrderModel;
