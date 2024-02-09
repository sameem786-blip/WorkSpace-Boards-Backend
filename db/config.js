const mongoose = require("mongoose");
const env = require("dotenv").config();

const uri = process.env.MONGO_URI;

exports.connect = async () => {
  try {
    await mongoose.connect(uri, { connectTimeoutMS: 8000 });
    console.log("Connected to DB")
  } catch (err) {
    console.log(err);
  }
};
