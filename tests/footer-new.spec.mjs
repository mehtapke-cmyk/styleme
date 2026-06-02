import { test } from '@playwright/test';

test('nouveau footer avec image bg', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  
  // Aller à la fin
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1700));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/footer-new-desktop.png', clip: { x: 0, y: 0, width: 1280, height: 800 } });
  
  // Bas complet
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/footer-new-bottom.png', clip: { x: 0, y: 0, width: 1280, height: 800 } });
  
  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 2000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/footer-new-mobile.png', fullPage: false });
});
