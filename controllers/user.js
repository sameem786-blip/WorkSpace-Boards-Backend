const User = require("../schemas/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const helpers = require("../helpers/index");

exports.updateUsername = async (req, res) => {
  try {
    console.log("Updating username")
    const username = req.body.username;
    const userId = req.userData.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username && username.trim() !== "") {
      if (username.trim() !== user.username) {
        user.username = username.trim();
        await user.save();

        const { firstName, lastName, _id, email, profilePic } = user;
        const token = jwt.sign(
          {
            firstName,
            lastName,
            username: user.username,
            userId: _id,
            email,
            profilePic,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );

        return res.status(200).json({
          message: "Username updated successfully",
          token,
        });
      } else {
        return res.status(404).json({ message: "No changes made" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Invalid or empty input provided" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateFirstname = async (req, res) => {
  try {
    console.log("Updating First Name")
    const firstname = req.body.firstName;
    const userId = req.userData.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstname && firstname.trim() !== "") {
      if (firstname.trim() !== user.firstName) {
        user.firstName = firstname.trim();
        await user.save();

        const { lastName, _id, email, profilePic,username } = user;
        const token = jwt.sign(
          {
            firstName: user.firstName,
            lastName,
            username,
            userId: _id,
            email,
            profilePic,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );

        return res.status(200).json({
          message: "Username updated successfully",
          token,
        });
      } else {
        return res.status(404).json({ message: "No changes made" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Invalid or empty input provided" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateLastname = async (req, res) => {
  try {
    const lastname = req.body.lastName;
    const userId = req.userData.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (lastname && lastname.trim() !== "") {
      if (lastname.trim() !== user.lastName) {
        user.lastName = lastname.trim();
        await user.save();

        const { firstName, _id, email, profilePic, username } = user;
        const token = jwt.sign(
          {
            firstName,
            lastName: user.lastName,
            username,
            userId: _id,
            email,
            profilePic,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );

        return res.status(200).json({
          message: "lastName updated successfully",
          token,
        });
      } else {
        return res.status(404).json({ message: "No changes made" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Invalid or empty input provided" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProfilePic = async (req, res) => {
  try {
    const profilePic = req.body.profilePic;
    const userId = req.userData.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (profilePic && profilePic.trim() !== "") {
      if (profilePic.trim() !== user.profilePic) {
        user.profilePic = profilePic.trim();
        await user.save();

        const { firstName, lastName, username, _id, email, profilePic } = user;
        const token = jwt.sign(
          { firstName, lastName, username, userId: _id, email, profilePic },
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );

        return res.status(200).json({
          message: "Profile picture updated successfully",
          token,
        });
      } else {
        return res.status(404).json({ message: "No changes made" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Invalid or empty input provided" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
