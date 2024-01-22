const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = {
      username: decodedToken.username,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      userId: decodedToken.userId,
      email: decodedToken.email,
      profilePic: decodedToken.profilePic,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
