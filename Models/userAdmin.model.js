const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAdminSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const userAdminModel = mongoose.model("userAdmin", userAdminSchema);
module.exports = userAdminModel;
