const fs = require("fs");
const puppeteer = require("puppeteer");
const source = require("./pagesrc.json");

async function capture() {
  let browser = null;
  try {

    browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1440,
      height: 1080,
    });

    for (const { name, url } of source) {
        console.log(`${name} - (${url})`);
        await page.goto(url);
        await page.screenshot({ path: `sites/${name}.png`});
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
    console.log(`\n${source.length} screenshots captured.`);
  }
}

capture();