const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    address: {
      type: String,
    },
    detail: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "detailorder",
      },
    ],
    quantity: {
      type: Number,
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
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
