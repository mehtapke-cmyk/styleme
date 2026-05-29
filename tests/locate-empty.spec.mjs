import { test } from '@playwright/test';

test('locate empty block', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://127.0.0.1:8767/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  
  const layout = await page.evaluate(() => {
    const all = document.querySelectorAll('main > *, body > *, footer, footer > *');
    return Array.from(all).slice(-15).map(el => {
      const r = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        tag: el.tagName,
        class: el.className.slice(0, 60),
        id: el.id,
        absY: Math.round(r.top + scrollTop),
        height: Math.round(el.offsetHeight),
        bgColor: getComputedStyle(el).backgroundColor
      };
    });
  });
  console.log('LAYOUT:', JSON.stringify(layout, null, 2));
  
  // Aussi : montre le DOM brut autour du footer
  const html = await page.evaluate(() => {
    const main = document.querySelector('main');
    const footer = document.querySelector('.site-footer');
    return {
      main_last_html: main ? main.innerHTML.slice(-1500) : 'no main',
      footer_class: footer ? footer.className : 'no footer'
    };
  });
  console.log('MAIN_LAST:', html.main_last_html);
});
