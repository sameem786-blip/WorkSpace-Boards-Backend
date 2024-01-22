const router = require("express").Router();

const userController = require("../controllers/user.js");

router.post("/updateUsername", userController.updateUsername);
router.post("/updateProfilePic", userController.updateProfilePic);

module.exports = router;
