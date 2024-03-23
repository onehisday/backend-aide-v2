const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
  {
    numberCode: {
      type: Number,
    },
    promoCode: {
      type: String,
    },
    percent: {
      type: Number,
    },
    isPromo: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
const promotionModel = mongoose.model("promotion", promotionSchema);
module.exports = promotionModel;
