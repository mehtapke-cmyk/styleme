const { chromium, devices } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await ctx.newPage();
  await page.goto('https://styleme.fr/?v=mobfg01', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelector('.comparison--with-bg').scrollIntoView({block:'start'}));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/mob-filigrane-top.png', fullPage: false });
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/mob-filigrane-mid.png', fullPage: false });
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/mob-filigrane-bot.png', fullPage: false });
  await browser.close();
  console.log('OK');
})().catch(e => { console.error(e.message); process.exit(1); });
