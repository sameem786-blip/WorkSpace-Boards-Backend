const router = require("express").Router();

const authController = require("../controllers/auth.js");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/forgetPassword", userController.forgetPassword);
router.post("/googleAuth", userController.googleAuth);

module.exports = router;
