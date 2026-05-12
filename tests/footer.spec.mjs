import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'home', url: 'http://127.0.0.1:8765/index.html' },
  { name: 'comment', url: 'http://127.0.0.1:8765/comment-ca-marche.html' },
  { name: 'comparaison', url: 'http://127.0.0.1:8765/comparaison.html' },
  { name: 'conseils', url: 'http://127.0.0.1:8765/conseils.html' },
  { name: 'rejoindre', url: 'http://127.0.0.1:8765/rejoindre.html' },
];

for (const p of PAGES) {
  test(`footer ${p.name}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(p.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    // scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    await page.screenshot({ path: `screenshots/footer-${p.name}.png`, fullPage: false });
    // also capture top of page to verify slogan banner on home
    if (p.name === 'home') {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      await page.screenshot({ path: `screenshots/slogan-banner-home.png`, fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 200 } });
    }
    console.log(`${p.name} console errors:`, errors.length);
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
}
