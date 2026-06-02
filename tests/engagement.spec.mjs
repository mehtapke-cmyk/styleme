import { test, expect } from '@playwright/test';

test('home — weekly moment visible', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  const wm = page.locator('.weekly-moment');
  await expect(wm).toBeVisible();
  await expect(wm.locator('.weekly-hour')).toBeVisible();
  await expect(wm.locator('.weekly-title')).toBeVisible();
  await wm.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/weekly-moment.png', fullPage: false });
  expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
});

test('home — chiffres-chocs présents', async ({ page }) => {
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  const figs = page.locator('.impact-figures .impact-figure');
  const count = await figs.count();
  expect(count).toBeGreaterThanOrEqual(1);
  await figs.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/impact-figures.png', fullPage: false });
});

test('home — piliers communauté + CTA', async ({ page }) => {
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  const pillars = page.locator('#communaute .community-pillar');
  const count = await pillars.count();
  expect(count).toBeGreaterThanOrEqual(1);
  const cta = page.locator('.community-cta');
  await expect(cta).toBeVisible();
  await page.locator('#communaute').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/community-v2.png', fullPage: false });
});

test('home — tableau comparatif présent', async ({ page }) => {
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  const rows = page.locator('.diff-table tbody tr');
  const count = await rows.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

test('engagement.html — page accessible', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('/engagement.html', { waitUntil: 'networkidle' });
  await expect(page.locator('h1').first()).toBeVisible();
  await page.screenshot({ path: 'screenshots/engagement-hero.png', fullPage: false });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/engagement-mid.png', fullPage: false });
  expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
});

test('navigation — lien engagement dans header', async ({ page }) => {
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForSelector('header.site-header', { timeout: 5000 });
  const burger = page.locator('.nav-burger');
  let navLink;
  if (await burger.isVisible()) {
    await burger.click();
    await expect(page.locator('#mobile-drawer.is-open')).toBeVisible({ timeout: 3000 });
    navLink = page.locator('#mobile-drawer a[href="engagement.html"]').first();
  } else {
    navLink = page.locator('header.site-header a[href="engagement.html"]').first();
  }
  await expect(navLink).toBeVisible();
});

test('mobile — weekly + engagement', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.locator('.weekly-moment').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mobile-weekly.png' });
  await page.goto('/engagement.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshots/mobile-engagement.png' });
  await ctx.close();
});
