import puppeteer, { Page, Browser } from 'puppeteer';

let page: Page;
let browser: Browser;

describe('Google', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 1000,
    });
    page = await browser.newPage();
    page.setViewport({ width: 1600, height: 1000 });
  });

  // afterAll(async () => {
  //   await page.close();
  // });
  // it('should be titled "Google"', async () => {
  //   // page.waitFor(4000);
  //   await page.goto('https://www.baidu.com/', { waitUntil: 'load' });
  //   const searchBox = await page.$('#kw');
  // });

  it('test collapse layout side bar', async () => {
    await page.goto('http://localhost:9000/', { waitUntil: 'load' });
    await page.click('.layout-side-collapse');
    await page.waitFor(1000);
    await page.click('.layout-side-collapse');
  });
});
