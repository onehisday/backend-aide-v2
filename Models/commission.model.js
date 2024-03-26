const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commissionSchema = new Schema(
  {
    price: {
      type: Number,
    },
    percent: {
      type: Number,
    },
    status: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const commissionModel = mongoose.model("commission", commissionSchema);
module.exports = commissionModel;
