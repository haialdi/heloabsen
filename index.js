const puppeter = require("puppeteer");
const moment = require("moment");
const webOptions = require("./options.json");
const { stepOne } = require("./query");
const list = require("./IDClass.json");

require("dotenv").config();

const url = process.env.url;

const getID = () => {
  for (let i = 0; i < list.length; i++) {
    if (process.argv[2] === list[i].code) {
      return list[i].id;
    }
  }
};

(async () => {
  const width = 1024;
  const height = 1600;
  const date = moment().format("dddd ,DD-MM-YYYY");
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
    await console.log("Login");
    await page.goto(url + webOptions.login);
    await page.waitFor(3000);
    await page.type("#username", process.env.usernumber);
    await page.type("#password", process.env.passnumber);
    await page.waitFor(1000);
    await page.click("#loginbtn");
    await page.waitFor(3000);

    await page.goto(url + webOptions.stepOne + `id=${getID()}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
