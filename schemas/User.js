const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  // Add other fields as needed for your user schema
});

const User = mongoose.model("User", userSchema);

module.exports = User;
