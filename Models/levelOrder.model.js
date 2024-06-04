const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelOrderSchema = new Schema({
    level: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    isLevel: {
        type: Boolean,
        default: true,
    },
    count: {
        type: Number,
        default: 0,
    },
    slotLevel: {
        type: Number,
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    // status: {
    //     type: Boolean,
    //     default: true,
    // },
});
const levelOrderModel = mongoose.model("levelOrder", levelOrderSchema);
module.exports = levelOrderModel;
