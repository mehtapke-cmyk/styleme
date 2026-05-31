import { test } from '@playwright/test';

test('vérifier bas de page', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  
  // Aller à la fin de la page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/avant-footer.png', clip: { x: 0, y: 0, width: 1280, height: 800 } });
  
  // Capter la structure DOM avant le footer
  const beforeFooter = await page.evaluate(() => {
    const footer = document.querySelector('.site-footer');
    if (!footer) return 'no footer';
    let prev = footer.previousElementSibling;
    const chain = [];
    for (let i = 0; i < 5 && prev; i++) {
      chain.push({
        tag: prev.tagName,
        class: prev.className,
        id: prev.id,
        innerHTML_len: prev.innerHTML.length,
        text_short: prev.textContent.trim().slice(0, 100)
      });
      prev = prev.previousElementSibling;
    }
    // Aussi : dernier enfant de main
    const main = document.querySelector('main');
    let lastChildren = [];
    if (main) {
      const children = Array.from(main.children);
      lastChildren = children.slice(-3).map(c => ({
        tag: c.tagName,
        class: c.className,
        id: c.id,
        bbox: c.getBoundingClientRect(),
        text_short: c.textContent.trim().slice(0, 80)
      }));
    }
    return { before_footer: chain, last_main_children: lastChildren };
  });
  console.log(JSON.stringify(beforeFooter, null, 2));
});
