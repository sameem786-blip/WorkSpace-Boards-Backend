const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const cors = require("cors");

const { connect } = require("./db/config");

const AuthRoutes = require("./routes/auth");
const UserRoutes = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connect();

app.use("/auth/user/", AuthRoutes);
app.use("/api/user/", UserRoutes);

module.exports = app;
