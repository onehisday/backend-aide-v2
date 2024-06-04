const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelRefSchema = new Schema({
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
const levelRefModel = mongoose.model("levelRef", levelRefSchema);
module.exports = levelRefModel;
