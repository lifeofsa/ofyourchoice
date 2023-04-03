const express = require("express");
const protect = require("../config/passAuth");
const {
  postBlog,
  getAllBlogs,
  blogUpdateId,
  blogById,
  blogDelete,
} = require("../controllers/blogsController");
const {
  postExtra,
  editExtra,
  deleteExtra,
} = require("../controllers/extrasController");
// const getAllBlogs = require("../controllers/blogsController");
const protectedRoute = require("../middlewares/oAuth");

const upload = require("./uploadRoutes");

const router = express.Router();

router.route("/addBlog").post(protect, upload, postBlog);
router.route("/addBlog/:id").post(protect, upload, postExtra);
router.route("/addBlog/edit/:id").put(protect, upload, blogUpdateId);
router.route("/addBlog/extra/:id").put(protect, upload, editExtra);
router.route("/addBlog/extra/:id").delete(protect, deleteExtra);
router.route("/").get(getAllBlogs);
router.route("/:id").delete(protect, blogDelete);
router.route("/:id").get(blogById);
// router.route("/").get(postBlog.getAllBlogs);

module.exports = router;
