const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

let sequelize;

// ✅ Check if full DB URL is provided
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  // ✅ Fallback to individual env variables
  sequelize = new Sequelize(
    process.env.DB_SCHEMA,
    process.env.DB_USER_NAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST_NAME,
      port: process.env.DB_PORT || 3306, // default to 3306 if not set
      dialect: "mysql",
    }
  );
}

try {
  await sequelize.authenticate();
  console.log("✅ Connection has been established successfully.");
} catch (error) {
  console.error("❌ Unable to connect to the database:", error);
}

module.exports = sequelize;
