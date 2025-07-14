const axios = require("axios");

// List of frontend/backend sites to ping to keep them awake
const websites = [
  "https://lifeofabblogs.onrender.com",
  "https://h-storecart.glitch.me/",
  "https://strapi-tuition-highway.onrender.com/admin",
  "https://atelic-strapi.onrender.com/admin",
];

const scheduleTask = () => {
  const interval = 14 * 60 * 1000; // 14 minutes in milliseconds

  setInterval(async () => {
    for (const url of websites) {
      try {
        const response = await axios.get(url);
        console.log(`✅ Pinged ${url} - Status: ${response.status}`);
      } catch (err) {
        console.log(`❌ Error pinging ${url}:`, err.message);
      }
    }
  }, interval);
};

// Start scheduling the task
scheduleTask();

module.exports = { scheduleTask };
