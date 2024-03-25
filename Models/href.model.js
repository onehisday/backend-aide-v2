const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hrefUserSchema = new Schema({
  addressGrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  addressChild: {
    type: String,
  },
});

const hrefModel = mongoose.model("href", hrefUserSchema);
module.exports = hrefModel;
