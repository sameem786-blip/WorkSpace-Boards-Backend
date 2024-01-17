const router = require("express").Router();

const authController = require("../controllers/auth.js");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgetPassword", authController.forgetPassword);
router.post("/googleAuth", authController.googleAuth);

module.exports = router;
