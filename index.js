const puppeter = require("puppeteer");
const moment = require("moment");
const webOptions = require("./options.json");
require("dotenv").config();

(async () => {
  const width = 1024;
  const height = 1600;
  const date = moment().format("dddd ,DD-MM-YYYY");
  const url = process.env.url;
  try {
    const browser = await puppeter.launch({
      headless: false,
      waitUntil: "networkidle2",
      defaultViewport: {
        width: width,
        height: height,
      },
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(50000);

    //login process
    await console.log("Login");
    await page.goto(url + webOptions.login);
    await page.waitFor(3000);
    await page.type("#username", process.env.usernumber);
    await page.type("#password", process.env.passnumber);
    await page.waitFor(1000);
    await page.click("#loginbtn");
    await page.waitFor(3000);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
