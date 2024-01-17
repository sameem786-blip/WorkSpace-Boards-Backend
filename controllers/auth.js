const User = require("../schemas/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const oauth2Client = new OAuth2Client();

//sign-up
exports.signup = async (req, res) => {};

//login
exports.login = async (req, res) => {};

//logout
exports.logout = async (req, res) => {};

//forget-password
exports.forgetPassword = async (req, res) => {};

//Google Oauth
exports.googleAuth = async (req, res) => {};
