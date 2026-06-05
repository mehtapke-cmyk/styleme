# Styleme.fr — Project Structure

## Root Layout

```text
styleme-1/
├── index.html                  # Homepage
├── comment-ca-marche.html      # How it works
├── comparaison.html            # Why Styleme
├── conseils.html               # Style advice
├── engagement.html             # Sustainability commitment
├── rejoindre.html              # Join / early access
├── faq.html                    # FAQ
├── credits.html                # Credits & team
├── confidentialite.html        # Privacy policy
├── mentions-legales.html       # Legal notice
├── 404.html                    # Custom 404 page
│
├── style-base.css              # CSS variables, reset, shared utilities
├── style-desktop.css           # Desktop layout & components
├── style-mobile.css            # Mobile overrides
├── style.css                   # Legacy fallback (do not modify)
│
├── script.js                   # i18n, language switching, forms
├── partials-v2.js              # Shared header/footer injection
├── interactions-v2.js          # Animations, scroll, FAQ, parallax
├── sw.js                       # Service worker
│
├── assets/                     # Images, videos, icons, SVGs
│   └── video/                  # MP4/WebM video files
│
├── app/                        # Standalone in-app page (separate context)
│   ├── index.html
│   ├── app.css
│   ├── app.js
│   ├── i18n.js
│   └── assets/
│
├── tests/                      # Playwright test specs (.spec.mjs)
├── .github/workflows/          # CI: browser-checks.yml, deploy-pages.yml
│
├── playwright.config.mjs
├── package.json
├── sitemap.xml
├── robots.txt
├── site.webmanifest
└── CNAME                       # Custom domain: styleme.fr
```

## Key Conventions

### Header & Footer (Partials)

- `index.html` contains the header and footer inline (source of truth for structure).
- All other pages use `<div data-partial="header"></div>` and `<div data-partial="footer"></div>` — `partials-v2.js` injects the full HTML at runtime.
- Never duplicate header/footer markup across pages. Always use the partial slots.

### HTML Structure per Page

Every page follows this shell:

```html
<head>
  <!-- meta, SEO, Open Graph, JSON-LD -->
  <link rel="stylesheet" href="style-base.css?v=YYYYMMDD">
  <link rel="stylesheet" href="style-desktop.css?v=YYYYMMDD">
  <link rel="stylesheet" href="style-mobile.css?v=YYYYMMDD">
</head>
<body>
  <a class="skip-link" href="#content">Aller au contenu</a>
  <div data-partial="header"></div>
  <main id="content"> ... </main>
  <div data-partial="footer"></div>
  <div class="toast" id="toast" role="alert" aria-live="polite"></div>
  <script src="partials-v2.js?v=YYYYMMDD"></script>
  <script src="script.js?v=YYYYMMDD"></script>
  <script src="interactions-v2.js?v=YYYYMMDD"></script>
</body>
```

### CSS Conventions

- All design tokens are CSS custom properties defined in `style-base.css` under `:root`.
- Key tokens: `--ink`, `--paper`, `--cream`, `--terracotta`, `--orange-fr`, `--font-display`, `--font-body`, `--space-section`, `--shell-max`.
- Use `.shell` wrapper class for max-width content containment.
- Use `.eyebrow` for section labels (uppercase, tracked, with a leading line).
- Scroll reveal: add class `reveal` or `reveal-stagger` — `interactions-v2.js` drives visibility via IntersectionObserver.
- Always respect `prefers-reduced-motion` — the base CSS handles this globally.

### i18n Conventions

- Use `data-i18n="key"` for text content, `data-i18n-html="key"` when the value contains HTML (e.g. `<span>` tags).
- Add all 8 language translations (`fr`, `en`, `es`, `de`, `it`, `ru`, `zh`, `ar`) whenever adding a new translatable string.
- The brand name inside translated strings: `Styleme<span class=\"fr-suffix\">.fr</span>` (escaped for JS string context).

### Assets

- Images go in `assets/`, videos in `assets/video/`.
- Prefer natural/warm variants of images (e.g. `*-natural.jpeg`) where available.
- Always include a `poster` attribute on `<video>` elements.

### Tests

- All test files live in `tests/` with `.spec.mjs` extension.
- Tests run against a local server on port `8767`.
- Do not check in generated output: `screenshots/`, `playwright-report/`, `test-results/` are gitignored.
