const ImageData = require("../models/imageModel");

const imagePost = async (req, res) => {
  try {
    const { image, title, desc, extra } = req.body;
    const img = new ImageData({
      image,
      extra: [{ title, desc }],
    });
    const createdOrder = await img.save();
    // const result = await cloudinary.uploader.upload(req.file.path);
    res.send(createdOrder);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { imagePost };
