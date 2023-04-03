const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const cloudinary = require("../extras/cloudinary");
const asyncHandler = require("express-async-handler");
const Extra = require("../models/extrasModel");
const { Buffer } = require("node:buffer");
const pl = require("../routes/uploadRoutes");
const upload = require("../routes/uploadRoutes");

const postBlog = asyncHandler(async (req, res) => {
  const { name, email, description, title } = req.body;
  // const data = req.body.file;
  // const user = User.findOne({ where: { id: req.user.id } });

  try {
    const blog = new Blog({
      creator_id: req.user.id,
      image: "",
      name: req.user.name,
      email: req.user.email,
      description: "sample description",
      title: "sample Title",
    });

    const createdOrder = await blog.save();
    // const result = await cloudinary.uploader.upload(req.file.path);
    res.json(createdOrder);
  } catch (error) {
    res.send(error);
  }
});

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Extra,
        as: "extra",
      },
    ],
  });
  res.json(blogs);
};

const blogUpdateId = asyncHandler(async (req, res) => {
  const { name, email, description, title, image } = req.body;
  const filepath = req.file;
  const blogs = await Blog.findOne({ where: { id: req.params.id } });
  try {
    if (blogs) {
      if (filepath) {
        const result = await cloudinary.uploader.upload(filepath?.path);
        blogs.title = title;
        blogs.name = req.user.name;
        blogs.email = req.user.email;
        blogs.description = description;
        blogs.image = result?.secure_url;

        const updatedBlog = await blogs.save();
        res.json(updatedBlog);
      }
      if (!filepath) {
        blogs.title = title;
        blogs.name = name;
        blogs.email = email;
        blogs.description = description;
        blogs.image = image;
        // res.json({ message: "Without Image" });
        const blogWithoutImage = await blogs.save();
        res.json(blogWithoutImage);
      }
    } else {
      res.status(404).send("Blog Not found");
    }
  } catch (error) {
    res.send(error);
  }
});

const blogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Extra,
        as: "extra",
      },
    ],
  });
  if (blog) {
    res.send(blog);
  } else {
    res.send("No Blogs Found");
  }
});

const blogDelete = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ where: { id: req.params.id } });
  try {
    if (blog) {
      await blog.destroy();
      res.json({ Message: "Blog Deleted" });
    } else {
      res.json({ Message: "No Blogs Founud" });
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = { getAllBlogs, postBlog, blogUpdateId, blogById, blogDelete };
