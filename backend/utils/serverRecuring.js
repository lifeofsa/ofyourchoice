const schedule = require("node-schedule");
const axios = require("axios");

// List of websites to fetch data from
const scheduleTask = () => {
  schedule.scheduleJob("*/2 * * * *", async function () {
    try {
      const response = await axios.get("https://lifeofabblogs.onrender.com");
      console.log("Response", response.data);
    } catch (err) {
      console.log(err.message);
    }
  });
};

// Start scheduling the task
scheduleTask();
module.exports = { scheduleTask };
