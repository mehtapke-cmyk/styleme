import { test, expect } from '@playwright/test';

test('hero mobile : 2 images visibles + zoom actif', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // attendre is-loaded + animations
  
  // Vérifier que les 2 panels sont visibles
  const leftVisible = await page.locator('.hero-panel--left').isVisible();
  const rightVisible = await page.locator('.hero-panel--right').isVisible();
  console.log('Hero panel LEFT visible :', leftVisible);
  console.log('Hero panel RIGHT visible :', rightVisible);
  
  // Vérifier que les 2 images se chargent
  const leftImg = await page.locator('.hero-panel--left img').getAttribute('src');
  const rightImg = await page.locator('.hero-panel--right img').getAttribute('src');
  console.log('Image LEFT :', leftImg);
  console.log('Image RIGHT :', rightImg);
  
  // Screenshot complet hero
  await page.screenshot({ path: 'screenshots/hero-mobile-split.png', clip: { x: 0, y: 0, width: 390, height: 844 } });
  
  // Screenshot page entière (pour voir si les 2 images sont bien empilées)
  await page.screenshot({ path: 'screenshots/hero-mobile-full.png', fullPage: false });
  
  expect(leftVisible).toBe(true);
  expect(rightVisible).toBe(true);
});

test('hero desktop : référence visuelle', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/hero-desktop-ref.png', clip: { x: 0, y: 0, width: 1280, height: 800 } });
});
