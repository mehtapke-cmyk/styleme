import { test } from '@playwright/test';
test('Vérifier la fusion des 2 blocs', async ({ page }) => {
  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  
  // Capture du bloc fusionné
  const weekly = page.locator('.weekly-moment');
  await weekly.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/fusion-desktop.png', fullPage: false });
  
  // Vérifier qu'il n'y a plus de bloc .problem
  const problemCount = await page.locator('section.problem').count();
  console.log('Anciens blocs .problem restants:', problemCount);
  
  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.locator('.weekly-moment').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/fusion-mobile.png', fullPage: false });
});
