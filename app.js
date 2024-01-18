const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");

const { connect } = require("./db/config");

const AuthRoutes = require("./routes/auth");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );

//   next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connect();

app.use("/auth/user/", AuthRoutes);

module.exports = app;
