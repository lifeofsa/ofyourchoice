const schedule = require("node-schedule");
const axios = require("axios");

// List of frontend/backend sites to ping to keep them awake
const websites = [
  "https://lifeofabblogs.onrender.com",
  "https://h-storecart.glitch.me/",
  "https://strapi-tuition-highway.onrender.com/admin"
];

const scheduleTask = () => {
  schedule.scheduleJob("*/2 * * * *", async function () {
    for (const url of websites) {
      try {
        const response = await axios.get(url);
        console.log(`✅ Pinged ${url} - Status: ${response.status}`);
      } catch (err) {
        console.log(`❌ Error pinging ${url}:`, err.message);
      }
    }
  });
};

// Start scheduling the task
scheduleTask();

module.exports = { scheduleTask };
