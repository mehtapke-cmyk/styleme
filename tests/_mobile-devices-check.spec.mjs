import { test, devices } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const targets = [
  { name: 'iPhone-14', device: devices['iPhone 14'] },
  { name: 'iPhone-SE', device: devices['iPhone SE'] },
  { name: 'Galaxy-S9+', device: devices['Galaxy S9+'] },
  { name: 'Galaxy-S24', device: devices['Galaxy S24'] || devices['Galaxy S9+'] },
];

const pages = [
  { slug: 'accueil', path: '/' },
  { slug: 'comparaison', path: '/comparaison.html' },
  { slug: 'conseils', path: '/conseils.html' },
  { slug: 'faq', path: '/faq.html' },
];

for (const t of targets) {
  for (const p of pages) {
    test(`${t.name} — ${p.slug}`, async ({ browser }) => {
      const ctx = await browser.newContext({ ...t.device });
      const page = await ctx.newPage();
      await page.goto(p.path, { waitUntil: 'networkidle' });
      await mkdir('screenshots/devices', { recursive: true });
      await page.screenshot({
        fullPage: true,
        path: `screenshots/devices/${t.name}__${p.slug}.png`,
      });
      await ctx.close();
    });
  }
}
