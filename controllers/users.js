const User = require("../schemas/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const helpers = require("../helpers/index");

exports.updateUsername = async (req, res) => {
  try {
    const username = req.body.username;
    const userId = req.userData.userId;
    let nModified = 0;

    const user = await User.findById(userId);

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username && username.trim() !== "") {
      if (username && username.trim() !== "") {
        User.username = username.trim();
        nModified += 1;
      }
      if (nModified > 0) {
        await User.save();
        const token = jwt.sign(
          {
            firstName: User.firstName,
            lastName: User.lastName,
            username: User.username,
            UserId: User._id,
            email: User.email,
            profilePic: User.profilePic,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );
        return res.status(200).json({
          message: "Username updated successfully",
          token: token,
        });
      } else {
        return res
          .status(404)
          .json({ message: "User not found or no changes made" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Invalid or empty input provided" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

exports.updateProfilePic = async (req, res) => {
  try {
    const profilePic = req.body.profilePic;
    const userId = req.userData.userId;
    let nModified = 0;

    const user = await User.findById(userId);

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    if (profilePic && profilePic.trim() !== "") {
      if (profilePic && profilePic.trim() !== "") {
        User.profilePic = profilePic.trim();
        nModified += 1;
      }
      if (nModified > 0) {
        await User.save();
        const token = jwt.sign(
          {
            firstName: User.firstName,
            lastName: User.lastName,
            username: User.username,
            UserId: User._id,
            email: User.email,
            profilePic: User.profilePic,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );
        return res.status(200).json({
          message: "profilePic updated successfully",
          token: token,
        });
      } else {
        return res
          .status(404)
          .json({ message: "User not found or no changes made" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Invalid or empty input provided" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};
