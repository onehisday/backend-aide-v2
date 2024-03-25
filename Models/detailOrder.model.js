const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailOrderSchema = new Schema(
  {
    tier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tier",
    },
    reward: {
      type: Number,
      default: 0,
    },
    isStart: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const detailOrderModel = mongoose.model("detailorder", detailOrderSchema);
module.exports = detailOrderModel;
