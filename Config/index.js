const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connect = async () => {
  try {
    const connect = await mongoose.connect(process.env.mongodb);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
module.exports = connect;
