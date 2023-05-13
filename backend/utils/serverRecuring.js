const schedule = require("node-schedule");
const axios = require("axios");

// List of websites to fetch data from
const websites = "https://ofyourchoice.net";

const fetchWebsiteData = async (website) => {
  try {
    const response = await axios.get(website);
    // Process the fetched data here
    console.log(`Fetched data from ${website}`);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${website}:`, error.message);
  }
};

const scheduleTask = () => {
  schedule.scheduleJob("*/10 * * * *", async function () {
    await fetchWebsiteData(websites);
  });
};

// Start scheduling the task
scheduleTask();
module.exports = { scheduleTask };
