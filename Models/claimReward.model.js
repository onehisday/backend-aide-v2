const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const claimRewardSchema = new Schema(
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

const claimRewardModel = mongoose.model("claimReward", claimRewardSchema);
module.exports = claimRewardModel;
