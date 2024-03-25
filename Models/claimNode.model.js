const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const claimNodeSchema = new Schema(
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

const claimNodeModel = mongoose.model("claimNode", claimNodeSchema);
module.exports = claimNodeModel;
