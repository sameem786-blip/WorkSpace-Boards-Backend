const User = require("../schemas/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const oauth2Client = new OAuth2Client();

//sign-up
exports.signup = async (req, res) => {
  try {
    const userObj = {
      name: req.body.name,
      email: req.body.email,
      encryptedPassword: req.body.password,
    };

    // Check if the user already exists
    const userResponse = await User.findOne({ email: userObj.email });

    console.log("A");

    if (userResponse) {
      return res.status(409).json("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userObj.encryptedPassword, 10);

    userObj.encryptedPassword = hashedPassword;

    // Create the user with the hashed password
    console.log("B");
    const newUser = await User.create(userObj);
    console.log("C");

    // Remove password from the response
    const { encryptedPassword, ...userWithoutPassword } = newUser.toObject();

    res.status(200).json({
      message: "User Created Successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

//login
exports.login = async (req, res) => {};

//logout
exports.logout = async (req, res) => {};

//forget-password
exports.forgetPassword = async (req, res) => {};

//Google Oauth
exports.googleAuth = async (req, res) => {};
