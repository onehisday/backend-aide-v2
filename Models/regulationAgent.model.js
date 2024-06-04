const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regulationAgentSchema = new Schema(
    {
        minimum: {
            type: Number,
        },
    },
    { timestamps: true }
);

const regulationAgentModel = mongoose.model(
    "regulationAgent",
    regulationAgentSchema
);
module.exports = regulationAgentModel;
