const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.sequelize = Sequelize;
const Blog = require("./blogModel");
const Extra = require("./extrasModel");
// const ImageData = require("./imageModel");
const Otp = require("./otpModel");
const User = require("./userModel");
// Otp.sync({ alter: true });
// Blog.sync({ force: true });
// Extra.sync({ force: true });
// User.sync({ alter: true });
// ImageData.sync();
// Extra.sync();
// sequelize.sync({ alter: true }).then(() => {
//   console.log("yes re-sync done!");
// });
// 1 to many relation for Users and Blogs
User.hasMany(Blog, { foreignKey: "creator_id", as: "blog" });
Blog.belongsTo(User, { foreignKey: "creator_id", as: "user" });

Blog.hasMany(Extra, { foreignKey: "blog_id", as: "extra" });
Extra.belongsTo(Blog, { foreignKey: "blog_id", as: "blog" });
// 1 to Many relation for Blogs and Image
// ImageData.hasMany(Blog, { foreignKey: "image_id", as: "blog" });
// Blog.belongsTo(ImageData, { foreignKey: "image_id", as: "image" });
