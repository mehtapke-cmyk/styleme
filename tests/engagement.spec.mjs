import { test, expect } from '@playwright/test';

test('home — weekly moment "Mardi pareil"', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  const wm = page.locator('.weekly-moment');
  await expect(wm).toBeVisible();
  await expect(wm.locator('.weekly-hour')).toContainText('07:12');
  await expect(wm.locator('.weekly-title')).toContainText('Mardi pareil');
  await wm.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/weekly-moment.png', fullPage: false });
  expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
});

test('home — 3 chiffres-chocs présents', async ({ page }) => {
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  const figs = page.locator('.impact-figures .impact-figure');
  await expect(figs).toHaveCount(3);
  await expect(figs.nth(0)).toContainText('2,6 milliards');
  await expect(figs.nth(1)).toContainText('2 à 8');
  await expect(figs.nth(2)).toContainText('camion');
  await figs.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/impact-figures.png', fullPage: false });
});

test('home — 4 piliers communauté avec famille + CTA', async ({ page }) => {
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  const pillars = page.locator('#communaute .community-pillar');
  await expect(pillars).toHaveCount(4);
  await expect(pillars.nth(3)).toContainText('famille');
  const cta = page.locator('.community-cta');
  await expect(cta).toBeVisible();
  await expect(cta).toContainText('Rejoindre la tribu');
  await page.locator('#communaute').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/community-v2.png', fullPage: false });
});

test('home — 4 lignes dans le tableau comparatif', async ({ page }) => {
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  const rows = page.locator('.diff-table tbody tr');
  await expect(rows).toHaveCount(4);
});

test('engagement.html — page complète', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:8765/engagement.html', { waitUntil: 'networkidle' });
  await expect(page.locator('.engagement-hero h1')).toContainText('autre mode');
  const sections = page.locator('.engagement-section');
  await expect(sections).toHaveCount(5);
  await expect(page.locator('.engagement-cta-link')).toContainText('Rejoindre');
  await page.screenshot({ path: 'screenshots/engagement-hero.png', fullPage: false });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/engagement-mid.png', fullPage: false });
  expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
});

test('navigation — lien "Notre engagement" dans header', async ({ page }) => {
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  await page.waitForSelector('header.site-header', { timeout: 5000 });
  const navLink = page.locator('a[href="engagement.html"]').first();
  await expect(navLink).toBeVisible();
  await expect(navLink).toContainText(/engagement/i);
});

test('mobile — weekly + engagement', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  await page.locator('.weekly-moment').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mobile-weekly.png' });
  await page.goto('http://127.0.0.1:8765/engagement.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshots/mobile-engagement.png' });
  await ctx.close();
});
