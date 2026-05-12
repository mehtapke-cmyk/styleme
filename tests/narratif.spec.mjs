import { test, expect } from '@playwright/test';

test('home — section manifesto "Le matin, autrement"', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  const manifesto = page.locator('#qui-sommes-nous');
  await expect(manifesto).toBeVisible();
  await expect(manifesto.locator('.manifesto-title')).toContainText('Le matin');
  await manifesto.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/manifesto.png', fullPage: false });
  expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
});

test('home — section communauté avec vidéo + 3 piliers', async ({ page }) => {
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  const community = page.locator('#communaute');
  await expect(community).toBeVisible();
  const pillars = await community.locator('.community-pillar').count();
  expect(pillars).toBe(3);
  await expect(community.locator('.community-pillar').nth(0)).toContainText('troc');
  await expect(community.locator('.community-pillar').nth(1)).toContainText('fast-fashion');
  // Vidéo présente et autoplay (muted)
  const videoExists = await community.locator('video.community-video').count();
  expect(videoExists).toBe(1);
  await community.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/community-immersive.png', fullPage: false });
});

test('home — ordre des sections : manifesto AVANT steps', async ({ page }) => {
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  const positions = await page.evaluate(() => {
    const m = document.querySelector('#qui-sommes-nous')?.getBoundingClientRect().top || 0;
    const s = document.querySelector('#comment-ca-marche')?.getBoundingClientRect().top || 0;
    return { manifesto: m, steps: s };
  });
  expect(positions.manifesto).toBeLessThan(positions.steps);
});

test('mobile — manifesto & community', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  await page.locator('#qui-sommes-nous').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mobile-manifesto.png' });
  await page.locator('#communaute').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/mobile-community.png' });
  await ctx.close();
});
