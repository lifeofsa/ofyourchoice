const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
// const sequelize = new Sequelize("mysql::memory:");

const Blog = sequelize.define(
  "blog",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    // extra: {
    //   type: DataTypes.JSON,
    //   get: function () {
    //     return JSON.parse(this.getDataValue("extra"));
    //   },
    //   set: function (val) {
    //     return this.setDataValue("extra", JSON.stringify(val));
    //   },
    // },
  },
  {
    // Other model options go here
  }
);
// Blog.associations = (models) => {
//   Blog.belongsTo(models.User, {
//     foreignKey: "creatorId",
//   });
// };
// `sequelize.define` also returns the model
console.log(Blog === sequelize.models.Blog); // true

module.exports = Blog;
