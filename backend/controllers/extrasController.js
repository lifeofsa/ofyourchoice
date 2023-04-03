const Extra = require("../models/extrasModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../extras/cloudinary");

const postExtra = asyncHandler(async (req, res) => {
  const filePath = req.file;
  const { subHeading, content, image } = req.body;

  try {
    if (filePath) {
      const result = await cloudinary.uploader?.upload(filePath.path);
      const extra = new Extra({
        blog_id: req.params.id,
        subHeading,
        content,
        image: result.secure_url,
      });
      const createdExtra = await extra.save();
      res.send(createdExtra);
    }
    if (!filePath) {
      const extra = new Extra({
        blog_id: req.params.id,
        subHeading,
        content,
      });
      const extraWithoutBlog = await extra.save();
      res.send(extraWithoutBlog);
    }
  } catch (error) {
    res.send(error);
  }
});
const editExtra = asyncHandler(async (req, res) => {
  const filePath = req.file;
  const { subHeading, content } = req.body;

  const extra = await Extra.findOne({ where: { id: req.params.id } });

  try {
    if (extra) {
      if (filePath) {
        const result = await cloudinary.uploader.upload(filePath?.path);
        extra.subHeading = subHeading;
        extra.content = content;
        extra.image = result.secure_url;

        const extraUpdated = await extra.save();
        res.send(extraUpdated);
      }
      if (!filePath) {
        extra.subHeading = subHeading;
        extra.content = content;
        extra.image = null;
        const extraWithoutImage = await extra.save();
        res.send(extraWithoutImage);
      } else {
        res.status(404).send("Extra not Found");
      }
    }
  } catch (error) {
    res.send(error);
  }
});
const deleteExtra = asyncHandler(async (req, res) => {
  const extra = await Extra.findOne({ where: { id: req.params.id } });

  try {
    if (extra) {
      await extra.destroy();
      res.json({ Message: "Blog Deleted" });
    } else {
      res.json({ Message: "No Blog Found" });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = { postExtra, editExtra, deleteExtra };
