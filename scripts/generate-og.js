const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  const htmlPath = 'file:///' + path.resolve(__dirname, 'og-template.html').replace(/\\/g, '/');
  
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });
  
  const outPath = path.resolve(__dirname, '../public/og.png');
  await page.screenshot({ path: outPath });
  
  console.log(`Generated ${outPath}`);
  await browser.close();
})();
