import { test } from '@playwright/test';

test('palette noir orange', async ({ page }) => {
  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://127.0.0.1:8767/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  // Header avec logo plus gros + .fr en orange
  await page.screenshot({ path: 'screenshots/palette-header.png', clip: { x: 0, y: 0, width: 1280, height: 160 } });
  
  // Hero + bandeau slogan (voir .fr orange)
  await page.screenshot({ path: 'screenshots/palette-hero.png', clip: { x: 0, y: 0, width: 1280, height: 800 } });
  
  // Scroll vers section comparaison (où Styleme.fr apparaît souvent)
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/palette-middle.png', clip: { x: 0, y: 0, width: 1280, height: 800 } });
  
  // Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/palette-footer.png', clip: { x: 0, y: 200, width: 1280, height: 800 } });
  
  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:8767/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/palette-mobile-hero.png', clip: { x: 0, y: 0, width: 390, height: 844 } });
});
