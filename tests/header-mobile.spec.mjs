import { test } from '@playwright/test';

test('header mobile burger', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:8767/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  
  // 1. Header fermé sur mobile
  await page.screenshot({ path: 'screenshots/mobile-header-closed.png', clip: { x: 0, y: 0, width: 390, height: 200 } });
  
  // 2. Ouvrir le burger
  await page.click('.nav-burger');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mobile-drawer-open.png', fullPage: false });
});

test('header desktop intact', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://127.0.0.1:8767/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/desktop-header.png', clip: { x: 0, y: 0, width: 1280, height: 120 } });
  
  // Test ouverture sélecteur langue desktop
  await page.click('.lang-dropdown-toggle');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/desktop-lang-open.png', clip: { x: 0, y: 0, width: 1280, height: 500 } });
});
