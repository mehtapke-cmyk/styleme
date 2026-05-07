import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const pages = [
  { name: 'accueil', path: '/' },
  { name: 'comment-ca-marche', path: '/comment-ca-marche.html' },
  { name: 'conseils', path: '/conseils.html' },
  { name: 'comparaison', path: '/comparaison.html' },
  { name: 'rejoindre', path: '/rejoindre.html' },
];

test.describe('pages Styleme.fr dans les navigateurs', () => {
  for (const pageInfo of pages) {
    test(`${pageInfo.name} se charge et génère une capture`, async ({ page }, testInfo) => {
      const consoleErrors = [];
      page.on('console', (message) => {
        if (message.type() === 'error') {
          consoleErrors.push(message.text());
        }
      });

      await page.goto(pageInfo.path, { waitUntil: 'networkidle' });
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('.brand').first()).toBeVisible();
      await expect(page.locator('.site-footer').first()).toBeVisible();

      await mkdir('screenshots', { recursive: true });
      await page.screenshot({
        fullPage: true,
        path: `screenshots/${testInfo.project.name}-${pageInfo.name}.png`,
      });

      expect(consoleErrors).toEqual([]);
    });
  }
});
