const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await ctx.newPage();

  await page.goto('https://styleme.fr/conseils.html?v=mobcheck1', { waitUntil: 'networkidle' });

  // Capture 1 : zone advice (homme + femme)
  await page.evaluate(() => document.querySelector('.advice-collage').scrollIntoView({block:'start'}));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '/tmp/mob-1-advice.png', fullPage: false });

  // Capture 2 : section moods complète
  await page.evaluate(() => document.querySelector('.mood-grid').scrollIntoView({block:'start'}));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '/tmp/mob-2-moods.png', fullPage: false });

  // Capture 3 : full page (overview)
  await page.screenshot({ path: '/tmp/mob-3-full.png', fullPage: true });

  console.log('OK');
  await browser.close();
})().catch(e => console.error('ERR', e.message));
