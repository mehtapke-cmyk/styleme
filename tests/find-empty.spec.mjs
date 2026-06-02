import { test } from '@playwright/test';

test('find empty white block', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  
  // Screenshot fullpage pour voir tout le site
  await page.screenshot({ path: 'screenshots/fullpage-1280.png', fullPage: true });
  
  // Cherche les sections qui ont peu de contenu visible
  const sections = await page.evaluate(() => {
    const all = document.querySelectorAll('main > section, main > div');
    return Array.from(all).map(el => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        class: el.className,
        id: el.id,
        height: el.offsetHeight,
        text_chars: el.textContent.trim().length,
        children: el.children.length
      };
    });
  });
  console.log('SECTIONS:', JSON.stringify(sections, null, 2));
});
