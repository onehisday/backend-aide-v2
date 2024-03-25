const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const claimRoseSchema = new Schema(
  {
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const claimRoseModel = mongoose.model("claimRose", claimRoseSchema);
module.exports = claimRoseModel;
