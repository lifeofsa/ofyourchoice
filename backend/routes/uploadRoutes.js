const multer = require("multer");
const path = require("path");
const express = require("express");
const protect = require("../config/passAuth");
const router = express.Router();
const cloudinary = require("../extras/cloudinary");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file?.fieldname}-${Date.now()}${path?.extname(file.originalname)}`
    );
  },
});
const fileExtensionCheck = (file, cb) => {
  const fileExt = /jpg|png|jpeg/;
  const extName = fileExt.test(path?.extname(file?.originalname).toLowerCase());
  const mimeType = fileExt.test(file?.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb("Images Only");
  }
};

const upload = multer({
  storage: storage,
  // fileFilter: function (err, file, cb) {
  //   fileExtensionCheck(file, cb);
  // },
}).single("file");

// const ol = () => async () => {
//   res.send(result.secure_url);
// };

// const pl = router.post("/", upload.single("file"), async (req, res) => {
//   const result = await cloudinary.uploader.upload(req.file.path);
//   res.send(result);
//   // try {
//   //   let promiseImage = req.files.map((picture) =>
//   //     cloudinary.v2.uploader.upload(picture.path)
//   //   );
//   //   let ImageResponse = await Promise.all(promiseImage);
//   //   res.json({ file: ImageResponse });
//   // } catch (error) {
//   //   res.json({ message: "Something Went Wrong" });
//   // }
// });

module.exports = upload;
