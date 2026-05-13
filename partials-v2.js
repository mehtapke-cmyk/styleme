/* ============================================================
   STYLEME.FR — PARTIALS V2
   Injecte le header et le footer pour les pages internes
   pour éviter la duplication et garder une seule source de vérité.
   ============================================================ */

(() => {
  'use strict';

  const LANG_ITEMS = [
    { code: 'fr', flag: '🇫🇷', label: 'FR — Français' },
    { code: 'en', flag: '🇬🇧', label: 'EN — English' },
    { code: 'es', flag: '🇪🇸', label: 'ES — Español' },
    { code: 'de', flag: '🇩🇪', label: 'DE — Deutsch' },
    { code: 'it', flag: '🇮🇹', label: 'IT — Italiano' },
    { code: 'ru', flag: '🇷🇺', label: 'RU — Русский' },
    { code: 'zh', flag: '🇨🇳', label: 'ZH — 中文' },
    { code: 'ar', flag: '🇸🇦', label: 'AR — عربي' }
  ];

  const langOptionsHTML = LANG_ITEMS
    .map(l => `<li role="option" data-lang="${l.code}"><button type="button" data-lang="${l.code}"><span>${l.flag}</span> ${l.label}</button></li>`)
    .join('');

  const HEADER = `
    <header class="site-header">
      <nav class="nav shell" aria-label="Navigation principale">
        <a class="brand" href="index.html" aria-label="Styleme.fr accueil">
          <span class="brand-mark" aria-hidden="true"><img src="assets/styleme-logo-transparent.png" alt=""></span>
          <span class="site-name">Styleme<span class="fr-suffix">.fr</span><sup class="tm" aria-label="marque déposée">™</sup></span>
        </a>
        <div class="nav-links">
          <a href="comparaison.html" data-i18n="nav_compare">Pourquoi Styleme<span class="fr-suffix">.fr</span> ?</a>
          <a href="comment-ca-marche.html" data-i18n="nav_how">Comment cela fonctionne ?</a>
          <a href="conseils.html" data-i18n="nav_advice">Conseils</a>
          <a href="engagement.html" data-i18n="nav_engagement">Notre engagement</a>
          <a href="rejoindre.html" data-i18n="nav_join">Rejoindre</a>
        </div>
        <div class="lang-dropdown lang-dropdown--desktop" role="navigation" aria-label="Sélection de langue">
          <button class="lang-dropdown-toggle" type="button" aria-haspopup="listbox" aria-expanded="false">
            <span class="lang-flag">🇫🇷</span>
            <span class="lang-code">FR</span>
            <span class="lang-chevron" aria-hidden="true">▾</span>
          </button>
          <ul class="lang-dropdown-menu" role="listbox" aria-label="Choisir la langue">
            ${langOptionsHTML}
          </ul>
        </div>
        <button class="nav-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-drawer">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </nav>

      <!-- Drawer mobile -->
      <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
        <div class="mobile-drawer__inner">
          <nav class="mobile-drawer__nav" aria-label="Navigation mobile">
            <a href="comparaison.html" data-i18n="nav_compare">Pourquoi Styleme<span class="fr-suffix">.fr</span> ?</a>
            <a href="comment-ca-marche.html" data-i18n="nav_how">Comment cela fonctionne ?</a>
            <a href="conseils.html" data-i18n="nav_advice">Conseils</a>
            <a href="engagement.html" data-i18n="nav_engagement">Notre engagement</a>
            <a href="rejoindre.html" data-i18n="nav_join">Rejoindre</a>
          </nav>
          <div class="mobile-drawer__lang">
            <p class="mobile-drawer__lang-title">Langue</p>
            <ul class="mobile-drawer__lang-list">
              ${langOptionsHTML}
            </ul>
          </div>
        </div>
      </div>
    </header>
  `;

  const FOOTER = `
    <footer class="site-footer">
      <div class="shell">

        <!-- Bloc marque centré : logo + nom + slogan -->
        <div class="footer-brand-row">
          <a class="footer-brand" href="index.html" aria-label="Styleme.fr">
            <span class="brand-mark"><img src="assets/styleme-logo-transparent.png" alt="Styleme.fr"></span>
            <span class="site-name">Styleme<span class="fr-suffix">.fr</span><sup class="tm" aria-label="marque déposée">™</sup></span>
          </a>
          <p class="footer-tagline" data-i18n="footer_tagline">L'élégance est déjà dans ton armoire. Achète moins, porte mieux avec ton conseiller mode Styleme<span class="fr-suffix">.fr</span></p>
        </div>

        <!-- Propulsé par MK -->
        <div class="footer-powered">
          <span class="footer-powered-label" data-i18n="footer_powered">Propulsé par</span>
          <a class="footer-powered-logo" href="https://mkcreations.fr" target="_blank" rel="noopener" aria-label="MK Créations Originales">
            <img src="assets/logo-mk-transparent.png" alt="MK Créations Originales">
          </a>
        </div>

        <!-- Manifeste pulsé -->
        <div class="footer-manifesto manifeste-pulse">
          <h3 class="footer-manifesto-title" data-i18n="footer_manifesto_title">Manifeste du Style Durable</h3>
          <ul class="footer-manifesto-list">
            <li><span class="manifesto-icon" aria-hidden="true">🍃</span><span data-i18n="footer_manifesto_1">Rien ne se jette. Tout se réinvente.</span></li>
            <li><span class="manifesto-icon" aria-hidden="true">🪐</span><span data-i18n="footer_manifesto_2">On change de tenue, pas de planète.</span></li>
            <li><span class="manifesto-icon" aria-hidden="true">🕐</span><span data-i18n="footer_manifesto_3">Le matin retrouve sa douceur.</span></li>
          </ul>
        </div>

        <!-- Navigation complète -->
        <div class="footer-grid">
          <div>
            <span class="footer-label" data-i18n="footer_pages">Navigation</span>
            <a href="index.html" data-i18n="nav_home">Accueil</a>
            <a href="comparaison.html" data-i18n="nav_compare">Pourquoi Styleme<span class="fr-suffix">.fr</span> ?</a>
            <a href="comment-ca-marche.html" data-i18n="nav_how">Comment cela fonctionne ?</a>
            <a href="conseils.html" data-i18n="nav_advice">Conseils</a>
            <a href="engagement.html" data-i18n="nav_engagement">Notre engagement</a>
            <a href="rejoindre.html" data-i18n="nav_join">Rejoindre</a>
          </div>
          <div>
            <span class="footer-label" data-i18n="footer_legal_label">Légal</span>
            <a href="mentions-legales.html" data-i18n="footer_legal">Mentions légales</a>
            <a href="confidentialite.html" data-i18n="footer_privacy">Politique de confidentialité</a>
          </div>
          <div>
            <span class="footer-label" data-i18n="footer_contact">Contact</span>
            <a href="mailto:bonjour@styleme.fr">bonjour@styleme.fr</a>
            <span class="footer-location" data-i18n="footer_location">Argelès-sur-Mer, France</span>
          </div>
        </div>

        <!-- Manifeste du Troc — vidéo immersive présente sur toutes les pages -->
        <section class="footer-troc" aria-labelledby="footer-troc-title">
          <div class="footer-troc__media">
            <video class="footer-troc__video" autoplay muted loop playsinline preload="metadata" poster="assets/video/styleme-troc-morning-poster.jpg">
              <source src="assets/video/styleme-troc-morning.mp4" type="video/mp4">
            </video>
            <div class="footer-troc__overlay"></div>
            <div class="footer-troc__content">
              <span class="footer-troc__eyebrow" data-i18n="footer_troc_eyebrow">Manifeste du Troc</span>
              <h3 id="footer-troc-title" class="footer-troc__title" data-i18n="footer_troc_title">Acheter moins, échanger plus.</h3>
              <p class="footer-troc__text" data-i18n="footer_troc_text">Le style se partage, la planète respire.</p>
              <a class="footer-troc__cta" href="rejoindre.html" data-i18n="footer_troc_cta">
                <span>Rejoindre le mouvement</span>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </section>

        <!-- Localisation avec drapeau filigrane -->
        <div class="footer-location-block">
          <span class="footer-location-label" data-i18n="footer_location_label">Conçu en France</span>
          <p class="footer-location-city">Argelès-sur-Mer</p>
        </div>

        <!-- Sélecteur de langue footer (8 langues) -->
        <div class="footer-lang">
          <span class="footer-lang-label" data-i18n="footer_lang_label">Langue</span>
          <div class="lang-dropdown lang-dropdown--footer" role="navigation" aria-label="Sélection de langue (footer)">
            <button class="lang-dropdown-toggle" type="button" aria-haspopup="listbox" aria-expanded="false">
              <span class="lang-flag">🇫🇷</span>
              <span class="lang-code">FR</span>
              <span class="lang-chevron" aria-hidden="true">▾</span>
            </button>
            <ul class="lang-dropdown-menu" role="listbox" aria-label="Choisir la langue">
              <li role="option" data-lang="fr"><button type="button" data-lang="fr"><span>🇫🇷</span> FR — Français</button></li>
              <li role="option" data-lang="en"><button type="button" data-lang="en"><span>🇬🇧</span> EN — English</button></li>
              <li role="option" data-lang="es"><button type="button" data-lang="es"><span>🇪🇸</span> ES — Español</button></li>
              <li role="option" data-lang="de"><button type="button" data-lang="de"><span>🇩🇪</span> DE — Deutsch</button></li>
              <li role="option" data-lang="it"><button type="button" data-lang="it"><span>🇮🇹</span> IT — Italiano</button></li>
              <li role="option" data-lang="ru"><button type="button" data-lang="ru"><span>🇷🇺</span> RU — Русский</button></li>
              <li role="option" data-lang="zh"><button type="button" data-lang="zh"><span>🇨🇳</span> ZH — 中文</button></li>
              <li role="option" data-lang="ar"><button type="button" data-lang="ar"><span>🇸🇦</span> AR — عربي</button></li>
            </ul>
          </div>
        </div>

        <!-- Bas de page : Styleme.fr + © directement sous Argelès -->
        <div class="footer-bottom">
          <span class="site-name">Styleme<span class="fr-suffix">.fr</span><sup class="tm" aria-label="marque déposée">™</sup></span>
          <span data-i18n="footer_copy">© 2026 · Tous droits réservés</span>
        </div>

      </div>
    </footer>
  `;

  const headerSlot = document.querySelector('[data-partial="header"]');
  const footerSlot = document.querySelector('[data-partial="footer"]');
  if (headerSlot) headerSlot.outerHTML = HEADER;
  if (footerSlot) footerSlot.outerHTML = FOOTER;

  // Notifier script.js qu'il doit (ré)initialiser les dropdowns langue
  // et réappliquer la langue sur le header/footer fraîchement injectés.
  // On laisse script.js définir window.__stylemeInitDropdowns ; on l'appelle
  // après son chargement via un retry court (les scripts sont en bas du body
  // donc partials-v2.js peut s'exécuter avant script.js).
  function tryInitDropdowns(attempts) {
    if (typeof window.__stylemeInitDropdowns === 'function') {
      window.__stylemeInitDropdowns();
      return;
    }
    if (attempts > 0) {
      setTimeout(() => tryInitDropdowns(attempts - 1), 50);
    }
  }
  // 10 tentatives × 50ms = 500ms max
  tryInitDropdowns(10);


  // ============================================================
  // BURGER MENU — Toggle drawer mobile
  // ============================================================
  function initBurger() {
    const burger = document.querySelector('.nav-burger');
    const drawer = document.getElementById('mobile-drawer');
    if (!burger || !drawer) return;

    // FIX: le header a un backdrop-filter qui cree un containing block,
    // ce qui piege le drawer (position:fixed) DANS le header (~137px de haut).
    // On deplace le drawer en fin de <body> pour qu'il s'ancre au viewport.
    if (drawer.parentElement !== document.body) {
      document.body.appendChild(drawer);
    }

    function close() {
      burger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.classList.remove('is-open');
      document.body.classList.remove('drawer-open');
    }
    function open() {
      burger.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      drawer.classList.add('is-open');
      document.body.classList.add('drawer-open');
      // FIX: s'assurer que les boutons langue du drawer mobile sont bien bindés
      // en re-déclenchant l'init des dropdowns à chaque ouverture
      if (typeof window.__stylemeInitDropdowns === 'function') {
        try { window.__stylemeInitDropdowns(); } catch (e) {}
      }
    }

    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      isOpen ? close() : open();
    });

    // Fermer au clic sur un lien du drawer
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    // Fermer avec Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Fermer si on agrandit l'écran au-dessus du breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBurger);
  } else {
    initBurger();
  }

})();
