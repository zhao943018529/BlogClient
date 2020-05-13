import puppeteer, { Page, Browser } from 'puppeteer';

jest.setTimeout(20000);

let page: Page;
let browser: Browser;

describe('Collapse', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 200,
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.setViewport({ width: 1600, height: 1000 });
  });

  afterEach(async () => {
    await page.close();
  });

  it('test login', async () => {
    await page.goto('http://localhost:9000/login', { waitUntil: 'load' });
    await page.type('.login-username input', 'ppppptttt');
    await page.type('.password-username input', 'dddddddd');
    await page.click('button.login-submit');
    await page.waitFor('.layout-side-collapse', { timeout: 1500 });
    await page.waitFor(1000);
  });
});
