const { Sequelize } = require("sequelize");
// const Blog = require("../models/blogModel");
// const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST_NAME,
    dialect: "mysql",
  }
);
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Blog.sync({ force: true });
// User.sync({ force: true });
module.exports = sequelize;
// module.exports = sequelize;
