const moment = require("moment");
const fs = require("fs-extra");
require("dotenv").config();

const initaluri = "http://siakad.polinema.ac.id/";

module.exports = {
  //
  execLogin: async (page) => {
    await console.log("========================");
    await console.log("ABSENIN :)");
    await console.log("========================");
    await console.log(`Lagi buka browser nih :)`);
    await page.goto(initaluri, {
      waitUntil: "domcontentloaded",
    });
    await console.log(`Lagi masukin nim sama password`);
    await page.waitFor(3000);
    await page.type("#username", process.env.NIM);
    await page.type("#password", process.env.Password);
    await page.waitFor(1000);
    await console.log(`Lagi login`);
    await page.click(".btn-success");
    await page.waitFor(1000);
    await console.log("Success Login :))");
  },
  //
  execAbsent: async (page, tableItem) => {
    await console.log("========================");
    await console.log("Membuka halaman absensinya duls");
    await page.goto(`${initaluri}/mahasiswa/tr_absensi/add`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitFor(1000);
    await console.log("Oke, Aku lengkapin formnya");
    await tableItem.map(async (value) => {
      const [buttonAbsen] = await page.$x(
        `//*[@id="form-action-wrapper-tr_absensi"]/div[1]/div[1]/div/div/div[2]/table/tbody/tr[${value}]/td[3]/div/span/input`
      );
      await buttonAbsen.click();
      const checkedStat = await (
        await buttonAbsen.getProperty("checked")
      ).jsonValue();
      if (!checkedStat) {
        throw new Error(`failed check box ${value}`);
      } else {
        await console.log(`Success check box ${value} `);
      }
    });
    await page.waitFor(2000);
    const [buttonSubmit] = await page.$x(
      "/html/body/div[3]/div[2]/div/div[2]/div/div/div/div/div[2]/div[3]/form/div[1]/div[2]/div/div/button"
    );
    await buttonSubmit.click();
    await console.log("Form udah disubmit, aku buat laporannya ke kamu");
    await page.waitFor(1000);
  },
  //
  execAvailableToday: async (page) => {
    await console.log("========================");
    await page.goto(`${initaluri}/mahasiswa/tr_absensi/index`, {
      waitUntil: "domcontentloaded",
    });
    await console.log("Kamu udah absen hari ini :)");
    await console.log("See you ;)");
    await console.log("========================");
  },
  //
  execLogger: async (page) => {
    await console.log("========================");
    await console.log("Lagi ngescreenshot laporannya");
    await page.waitFor(1000);
    await fs.mkdirp("logs/");
    const date = moment().format("dddd ,DD-MM-YYYY");
    await page.screenshot({ path: `logs/${date}-success.png` });
    await console.log("Laporannya udah aku buat");
    await console.log("Check laporannya di folder logs dulu ya :)");
    await console.log("Thank You ;)");
    await console.log("========================");
  },
  checkToday: async (date) => {
    return new Promise((resolve, reject) => {
      fs.readFile(`logs/${date}-success.png`, (err, data) => {
        resolve(data);
        reject(err);
      });
    });
  },
};
