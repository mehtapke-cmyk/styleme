/* ============================================================
   STYLEME.FR — PARTIALS V2
   Injecte le header et le footer pour les pages internes
   pour éviter la duplication et garder une seule source de vérité.
   ============================================================ */

(() => {
  'use strict';

  const HEADER = `
    <header class="site-header">
      <nav class="nav shell" aria-label="Navigation principale">
        <a class="brand" href="index.html" aria-label="Styleme.fr accueil">
          <span class="brand-mark" aria-hidden="true"><img src="assets/styleme-logo-transparent.png" alt=""></span>
          <span class="site-name">Styleme.fr</span>
        </a>
        <div class="nav-links">
          <a href="comparaison.html" data-i18n="nav_compare">Pourquoi Styleme.fr ?</a>
          <a href="comment-ca-marche.html" data-i18n="nav_how">Comment cela fonctionne ?</a>
          <a href="conseils.html" data-i18n="nav_advice">Conseils</a>
          <a href="rejoindre.html" data-i18n="nav_join">Rejoindre</a>
        </div>
        <div class="lang-dropdown" role="navigation" aria-label="Sélection de langue">
          <button class="lang-dropdown-toggle" type="button" aria-haspopup="listbox" aria-expanded="false">
            <span class="lang-flag">🇫🇷</span>
            <span class="lang-code">FR</span>
            <span class="lang-chevron" aria-hidden="true">▾</span>
          </button>
          <ul class="lang-dropdown-menu" role="listbox" aria-label="Choisir la langue">
            <li role="option" data-lang="fr"><button type="button" data-lang="fr"><span>🇫🇷</span> FR — Français</button></li>
            <li role="option" data-lang="en"><button type="button" data-lang="en"><span>🇬🇧</span> EN — English</button></li>
            <li role="option" data-lang="es"><button type="button" data-lang="es"><span>🇪🇸</span> ES — Español</button></li>
            <li role="option" data-lang="zh"><button type="button" data-lang="zh"><span>🇨🇳</span> 中文</button></li>
            <li role="option" data-lang="ru"><button type="button" data-lang="ru"><span>🇷🇺</span> RU — Русский</button></li>
            <li role="option" data-lang="ar"><button type="button" data-lang="ar"><span>🇸🇦</span> AR — عربي</button></li>
          </ul>
        </div>
      </nav>
    </header>
  `;

  const FOOTER = `
    <footer class="site-footer">
      <div class="shell">
        <div class="footer-brand-row">
          <a class="footer-brand brand" href="index.html" aria-label="Styleme.fr">
            <span class="brand-mark"><img src="assets/styleme-logo-transparent.png" alt="Styleme.fr"></span>
            <span class="site-name">Styleme.fr</span>
          </a>
          <p class="footer-tagline" data-i18n="footer_tagline">Matin simplifié. Dressing optimisé. Styles partagés. Communauté engagée.</p>
        </div>
        <div class="footer-grid">
          <div>
            <span class="footer-label" data-i18n="footer_pages">Navigation</span>
            <a href="comparaison.html" data-i18n="nav_compare">Pourquoi Styleme.fr ?</a>
            <a href="comment-ca-marche.html" data-i18n="nav_how">Comment cela fonctionne ?</a>
            <a href="conseils.html" data-i18n="nav_advice">Conseils</a>
            <a href="rejoindre.html" data-i18n="nav_join">Rejoindre</a>
          </div>
          <div>
            <span class="footer-label" data-i18n="footer_legal_label">Légal</span>
            <a href="confidentialite.html" data-i18n="footer_privacy">Confidentialité</a>
            <a href="mentions-legales.html" data-i18n="footer_legal">Mentions légales</a>
          </div>
          <div>
            <span class="footer-label" data-i18n="footer_contact">Contact</span>
            <a href="mailto:bonjour@styleme.fr">bonjour@styleme.fr</a>
            <span class="footer-location" data-i18n="footer_location">Argelès-sur-Mer, France</span>
          </div>
        </div>
        <div class="footer-bottom">
          <span class="site-name">Styleme.fr</span>
          <span>© 2026 · Propulsé par MK Créations Originales</span>
        </div>
      </div>
    </footer>
  `;

  const headerSlot = document.querySelector('[data-partial="header"]');
  const footerSlot = document.querySelector('[data-partial="footer"]');
  if (headerSlot) headerSlot.outerHTML = HEADER;
  if (footerSlot) footerSlot.outerHTML = FOOTER;
})();
