import { test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const pages = [
  { name: '01-accueil-hero', path: '/index.html', y: 0 },
  { name: '02-accueil-problem', path: '/index.html', y: 900 },
  { name: '03-accueil-story', path: '/index.html', y: 2000 },
  { name: '04-accueil-steps', path: '/index.html', y: 3100 },
  { name: '05-accueil-comparison', path: '/index.html', y: 4400 },
  { name: '06-accueil-community', path: '/index.html', y: 5400 },
  { name: '07-accueil-signup-footer', path: '/index.html', y: 7800 },
  { name: '08-comment-ca-marche', path: '/comment-ca-marche.html', y: 0 },
  { name: '09-comparaison', path: '/comparaison.html', y: 0 },
  { name: '10-conseils', path: '/conseils.html', y: 0 },
  { name: '11-rejoindre', path: '/rejoindre.html', y: 0 },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

test.describe('Preview Claudo', () => {
  for (const vp of viewports) {
    for (const p of pages) {
      // sur mobile, on garde uniquement les pages full
      if (vp.name === 'mobile' && p.y > 0) continue;
      test(`${vp.name}-${p.name}`, async ({ browser }) => {
        const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await ctx.newPage();
        await page.goto(p.path, { waitUntil: 'networkidle' });
        await page.waitForTimeout(700);
        if (p.y > 0) {
          await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), p.y);
          await page.waitForTimeout(500);
        }
        await mkdir('screenshots', { recursive: true });
        await page.screenshot({
          fullPage: p.y === 0 ? (vp.name === 'mobile' ? true : false) : false,
          path: `screenshots/${vp.name}-${p.name}.png`,
        });
        await ctx.close();
      });
    }
  }
});
