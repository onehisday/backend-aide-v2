const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const withdrawSchema = new Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        amount: {
            type: Number,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const withdrawModel = mongoose.model("withdraw", withdrawSchema);
module.exports = withdrawModel;
