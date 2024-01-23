const router = require("express").Router();

const authController = require("../controllers/auth.js");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgetPassword/sendOTP", authController.sendOTP);
router.post("/forgetPassword/submitOTP", authController.submitOTP);
router.post("/googleAuth", authController.googleAuth);

module.exports = router;
