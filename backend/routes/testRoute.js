const express = require("express");
const payment = require("../controllers/testController");
const passport = require("passport");
const protect = require("../config/passAuth");
const { imagePost } = require("../controllers/imageController");

// const admin = require("../middlewares/auth");
// const postBlog = require("../controllers/blogsController");

const router = express.Router();

router.route("/").post(imagePost);

module.exports = router;
