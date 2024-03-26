const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingSchema = new Schema(
  {
    title: {
      type: String,
    },
    descriptionSetting: {
      type: String,
    },
    favicon: {
      type: Array,
    },
    logo: {
      type: Array,
    },
  },
  { timestamps: true }
);
const settingModel = mongoose.model("setting", settingSchema);
module.exports = settingModel;
