const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AuthRoutes = require("./routes/auth");

const { MongoClient } = require("mongodb");
const { connect } = require("./db/config");
// const UserRoutes = require("./routes/user");
// const ChatRoutes = require("./routes/chat");
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
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
