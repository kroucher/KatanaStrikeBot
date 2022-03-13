const puppeteer = require("puppeteer");

module.exports = (vault) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await Promise.all([
        page.goto(vault, {
          waitUntil: [
            "load",
            "domcontentloaded",
            "networkidle0",
            "networkidle2",
          ],
        }),
      ]);
      await page.waitForNetworkIdle(1000);
      let urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll("div.Option--content__item");
        let images = document.querySelectorAll("img.Option--icon__image");
        items.forEach((item) => {
          results.push({
            text: item.innerText,
          });
        });
        images.forEach((item) => {
          results.push({
            logo: item.src,
          });
        });
        return results;
      });
      browser.close();
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  });
};
