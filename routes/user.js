const router = require("express").Router();

const userController = require("../controllers/user.js");
const checkLogin = require("../middlewares/checkLogin.js");

router.put("/updateUsername",checkLogin, userController.updateUsername)
router.put("/updateProfilePic", userController.updateProfilePic)
router.put("/updateFirstname", checkLogin,userController.updateFirstname)
router.put("/updateLastname", checkLogin,userController.updateLastname)

module.exports = router;
