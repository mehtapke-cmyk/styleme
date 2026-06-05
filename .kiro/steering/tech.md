# Styleme.fr — Tech Stack

## Stack

- **HTML5** — static pages, no build step, no framework
- **CSS3** — vanilla, split into three files (see below)
- **JavaScript** — vanilla ES6+, IIFE modules, no runtime dependencies
- **Testing** — Playwright (Chromium, Firefox, WebKit, Mobile Chrome)
- **CI/CD** — GitHub Actions
- **Hosting** — GitHub Pages with custom domain `styleme.fr`

## No Build Step

This is a fully static site. There is no bundler, compiler, or transpiler. Files are served as-is. Cache busting is done manually via query strings (e.g. `?v=20260603`).

## CSS Architecture

| File | Role |
| --- | --- |
| `style-base.css` | CSS variables, reset, typography, shared utilities — loaded first on all pages |
| `style-desktop.css` | Layout and component styles for desktop |
| `style-mobile.css` | Mobile-specific overrides and responsive layout |

All three are loaded in `<head>` in that order. Do not merge them. Internal `<style>` blocks in HTML are acceptable for page-specific one-off rules.

## JavaScript Files

| File | Role |
| --- | --- |
| `script.js` | i18n translation system, language switching, form handling, GA4 |
| `partials-v2.js` | Injects shared header and footer HTML into pages that use `data-partial="header"` / `data-partial="footer"` |
| `interactions-v2.js` | Scroll animations, parallax, FAQ accordion, header hide-on-scroll |

Scripts are loaded at the bottom of `<body>` in this order: `partials-v2.js` → `script.js` → `interactions-v2.js`.

## i18n System

Translations live in a `translations` object in `script.js`, keyed by language code (`fr`, `en`, `es`, `de`, `it`, `ru`, `zh`, `ar`). HTML elements use `data-i18n="key"` (text) or `data-i18n-html="key"` (innerHTML). The active language is stored in `localStorage`.

## Service Worker

`sw.js` is registered on all pages. On load, existing registrations are unregistered first, then the new SW is registered (cache-busting strategy).

## Commands

```bash
# Local dev server (required for Playwright)
python3 -m http.server 8000
# Open http://localhost:8000

# Install Playwright browsers (once)
npm run browsers:install

# Run all browser tests
npm run test:browser

# Run tests for a specific browser
npm run test:browser:chromium
npm run test:browser:firefox
npm run test:browser:webkit
npm run test:browser:mobile

# Generate screenshots
npm run test:screenshots
```

Playwright starts its own server on port `8767` via `python3 -m http.server 8767` (configured in `playwright.config.mjs`). It reuses an existing server if one is already running on that port.

## GA4

Google Analytics 4 tag `G-JW5GNM9Q2Y` is included inline in `<head>` on all pages.
