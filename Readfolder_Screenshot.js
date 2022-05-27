const fs = require('fs');
const dir = './sites/';
const puppeteer = require("puppeteer");
const path = require('path');

let arr = [];

try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      var stats = fs.statSync(`sites/${file}`);
        if (stats.isDirectory()){
          arr.push(file);
        }
    });

} catch (err) {
    console.log(err);
}

async function capture() {
  let browser = null;
  try {

    browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    
    for (const element of arr) {
        console.log(`Saving Sceenshot for ${element} theme ....`);
        await page.goto(`file:${path.join(__dirname,'sites',element,'index.html')}`);
        await page.screenshot({ path: `sites/${element}_Capture.png`});
        
        
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
    console.log(`\n${arr.length} screenshots captured.`);
  }
}

capture();