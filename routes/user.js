const router = require("express").Router();

const userController = require("../controllers/user.js");

router.put("/updateUsername", userController.updateUsername);
router.put("/updateProfilePic", userController.updateProfilePic);
router.put("/updateFirstname", userController.updateProfilePic);
router.put("/updateLastname", userController.updateProfilePic);

module.exports = router;
