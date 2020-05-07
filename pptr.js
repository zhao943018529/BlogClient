const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    slowMo: 2000,
  });
  const page = await browser.newPage();
  await page.goto('http://10.11.1.140:9000/todo');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
