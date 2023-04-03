const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
// const sequelize = new Sequelize("mysql::memory:");

const Extra = sequelize.define(
  "extra",
  {
    // Model attributes are defined here
    subHeading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Content is required" },
      },
    },
    image: {
      type: DataTypes.STRING,
    },
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
console.log(Extra === sequelize.models.Extra); // true

module.exports = Extra;
