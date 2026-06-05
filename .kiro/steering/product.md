---
inclusion: always
---

# Styleme.fr — Product Overview

Styleme.fr is a **static marketing/landing site** for an AI-powered personal stylist app. The core mission is **slow fashion**: help users dress better with what they already own, reducing impulse purchases and the daily mental load of getting dressed.

## What This Site Is

- A pre-launch marketing and early-access sign-up site — not the app itself
- The app lives separately under `app/` (standalone context, do not mix with main site)
- No e-commerce, no user accounts, no backend — purely informational and lead-capture

## Target Audience

French-speaking users (primary). Full multilingual support: `fr`, `en`, `de`, `es`, `it`, `ru`, `zh`, `ar`.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Homepage — hero, problem, how it works, sign-up |
| `comment-ca-marche.html` | How it works |
| `comparaison.html` | Why Styleme vs competitors |
| `conseils.html` | Style advice |
| `engagement.html` | Sustainability commitment |
| `rejoindre.html` | Join / early access sign-up |
| `faq.html` | FAQ |
| `credits.html` | Visual credits & team |
| `confidentialite.html` | Privacy policy |
| `mentions-legales.html` | Legal notice |
| `404.html` | Custom 404 page |

## Brand Identity (Critical — Always Follow)

- **Brand name markup**: always `Styleme<span class="fr-suffix">.fr</span>™`
  - Never write "Styleme.fr" as plain text in HTML
  - The `.fr` suffix must always be wrapped in `<span class="fr-suffix">` so it renders in orange
  - The `™` symbol follows directly after `</span>`
- **Orange accent**: `var(--orange-fr)` — used exclusively for the `.fr` suffix
- **Tagline**: *"L'élégance est déjà dans ton armoire."* — do not alter or translate this
- **Tone**: personal, warm, francophone — never corporate, never pushy

## Brand Values

- Zero ads, zero forced shopping cart
- Anti-fast-fashion / slow fashion positioning
- French origin: Argelès-sur-Mer, created by Mehtap Keles

## Copy & Content Guidelines

- Default language for all new content is **French**
- When adding any user-facing string, add translations for all 8 languages (`fr`, `en`, `de`, `es`, `it`, `ru`, `zh`, `ar`) in `script.js`
- Keep tone warm, direct, and empowering — the product is a personal companion, not a fashion authority
- Avoid superlatives and marketing clichés; the brand voice is understated and honest
