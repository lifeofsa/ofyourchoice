const axios = require("axios");

// Websites for 14-minute interval
const websitesEvery14Min = [
  "https://lifeofabblogs.onrender.com",
  "https://atelic-strapi.onrender.com/admin",
  "https://strapi-tuition-highway.onrender.com/admin",
];

// Websites for 30-second interval
const websitesEvery30Sec = [
  "https://www.youtube.com/shorts/7m10cmk5s4A",
  "https://www.youtube.com/shorts/Hlgama5QU5Q",
  "https://www.youtube.com/shorts/KxIohWpKA5M",
  "https://www.youtube.com/shorts/4zsCqD-c2C4",
  "https://www.youtube.com/shorts/_tw8zSsCbu8",
  "https://www.youtube.com/shorts/Ef7Ao6yv5mE",
];

// 14-minute scheduler
const schedule14MinTask = () => {
  // const interval = 14 * 60 * 1000; // 14 minutes
  const interval = 1000;

  setInterval(async () => {
    for (const url of websitesEvery14Min) {
      try {
        const response = await axios.get(url);
        console.log(`✅ [14min] Pinged ${url} - Status: ${response.status}`);
      } catch (err) {
        console.log(`❌ [14min] Error pinging ${url}:`, err.message);
      }
    }
  }, interval);
};

// 30-second scheduler
const schedule30SecTask = () => {
  const interval = 1000;

  setInterval(async () => {
    for (const url of websitesEvery30Sec) {
      try {
        const response = await axios.get(url);
        console.log(`✅ [30sec] Pinged ${url} - Status: ${response.status}`);
      } catch (err) {
        console.log(`❌ [30sec] Error pinging ${url}:`, err.message);
      }
    }
  }, interval);
};

// Start both schedulers
schedule14MinTask();
schedule30SecTask();

module.exports = { schedule14MinTask, schedule30SecTask };
