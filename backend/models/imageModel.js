const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ImageData = sequelize.define("image", {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  extra: {
    type: DataTypes.STRING,
    get: function () {
      return JSON.parse(this.getDataValue("extra"));
    },
    set: function (val) {
      return this.setDataValue("extra", JSON.stringify(val));
    },
  },
});

module.exports = ImageData;
