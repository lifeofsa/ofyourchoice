const axios = require("axios");
const puppeteer = require("puppeteer");

const websitesEvery14Min = [
  "https://lifeofabblogs.onrender.com",
  "https://atelic-strapi.onrender.com/admin",
  "https://strapi-tuition-highway.onrender.com/admin",
];

const websitesEvery30Sec = [
  "https://www.youtube.com/shorts/7m10cmk5s4A",
  "https://www.youtube.com/shorts/Hlgama5QU5Q",
  "https://www.youtube.com/shorts/KxIohWpKA5M",
  "https://www.youtube.com/shorts/4zsCqD-c2C4",
  "https://www.youtube.com/shorts/_tw8zSsCbu8",
  "https://www.youtube.com/shorts/Ef7Ao6yv5mE",
];

const schedule14MinTask = () => {
  const interval = 14 * 60 * 1000;
  setInterval(async () => {
    for (const url of websitesEvery14Min) {
      try {
        const response = await axios.get(url);
        console.log(`✅ [14min] Pinged ${url} - Status: ${response.status}`);
      } catch (err) {
        console.log(`❌ [14min] Error pinging ${url}: ${err.message}`);
      }
    }
  }, interval);
};

const schedule30SecTask = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  let currentIndex = 0;

  setInterval(async () => {
    const url = websitesEvery30Sec[currentIndex];
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
      console.log(`🌐 [30sec] Loaded in headless browser: ${url}`);
    } catch (err) {
      console.log(`❌ [30sec] Failed to load ${url}: ${err.message}`);
    }
    currentIndex = (currentIndex + 1) % websitesEvery30Sec.length;
  }, 10 * 1000);
};

(async () => {
  schedule14MinTask();
  await schedule30SecTask();
})();
