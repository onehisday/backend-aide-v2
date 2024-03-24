const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingSchema = new Schema(
  {
    address: {
      type: String,
    },
    linkRef: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const settingModel = mongoose.model("setting", settingSchema);
module.exports = settingModel;
