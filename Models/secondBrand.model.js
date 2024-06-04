const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const secondBranchSchema = new Schema({
    percent: {
        type: Number,
    },
});

const secondBranchModel = mongoose.model("secondBranch", secondBranchSchema);
module.exports = secondBranchModel;
