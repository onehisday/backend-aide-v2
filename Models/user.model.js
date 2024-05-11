const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        address: {
            type: String,
        },
        linkRef: {
            type: String,
        },
        totalReward: {
            type: Number,
            default: 0,
        },
        totalOrder: {
            type: Number,
            default: 0,
        },
        rewardOrder: {
            type: Number,
            default: 0,
        },
        quantityChild: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
