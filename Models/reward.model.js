const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  quantityCoin: {
    type: Number,
  },
  setTime: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
const rewardModel = mongoose.model("reward", rewardSchema);
module.exports = rewardModel;
