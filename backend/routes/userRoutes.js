const express = require("express");
const protect = require("../config/passAuth");
const {
  registerUser,
  loginUser,
  getAllUsers,
  sendOtp,
  changePassword,
} = require("../controllers/userController");
const admin = require("../middlewares/oAuth");
// const admin = require("../middlewares/oAuth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/sendmail").post(sendOtp);
router.route("/changepassword").post(changePassword);
router.route("/login").post(loginUser);
router.route("/users").get(protect, admin, getAllUsers);

module.exports = router;
