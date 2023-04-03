const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Otp = sequelize.define(
  "otp",
  {
    name: {
      type: DataTypes.STRING,
    },
    otp: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expTime: {
      type: DataTypes.DOUBLE,
      // allowNull: false,
    },
  },
  {
    tableName: "otp",
  }
);

module.exports = Otp;
