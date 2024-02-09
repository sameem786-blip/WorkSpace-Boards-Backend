const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
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
  role: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  OTP: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  allowPasswordReset: {
    type: Boolean,
    default: false
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
