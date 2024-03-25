const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countOrderSchema = new Schema({
  address: {
    type: String,
  },
  totalNode: {
    type: Number,
  },
  totalReward: {
    type: Number,
  },
});

const countOrderModel = mongoose.model("countOrder", countOrderSchema);
module.exports = countOrderModel;
