const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tierSchema = new Schema({
  tier: {
    type: Number,
  },
  ethCost: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  fdv: {
    type: Number,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const tierModel = mongoose.model("tier", tierSchema);
module.exports = tierModel;
