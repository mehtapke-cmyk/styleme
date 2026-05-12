/* ============================================================
   STYLEME.FR — INTERACTIONS V2
   Animations scroll, micro-interactions, FAQ, menu mobile
   ============================================================ */

(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Header scrolled state ----------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Hero loaded ----------
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('is-loaded'));
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .section-head, .story-copy, .story-photo, .step-card, .advice-copy, .advice-image, .community-image, .community-grid > div, .sustainable-grid > *, .faq-card, .signup-box, .photo-break, .diff-table, .thought');

  revealEls.forEach((el, i) => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-stagger')) {
      el.classList.add('reveal');
    }
    el.style.setProperty('--i', i % 6);
  });

  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Stagger children
  document.querySelectorAll('.thought-bubbles, .steps-grid, .mini-metrics, .advice-list, .footer-grid, .faq-list').forEach(group => {
    group.classList.add('reveal-stagger');
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  // ---------- Subtle parallax on photos ----------
  if (!reduced) {
    const legacyEls = document.querySelectorAll('.photo-break img, .story-photo img, .step-card img, .community-image img');
    legacyEls.forEach(img => img.classList.add('parallax-img'));

    // Nouveaux éléments avec [data-parallax="0.15"] : amplitude custom
    const customEls = Array.from(document.querySelectorAll('[data-parallax]')).map(el => {
      const target = el.matches('video, img') ? el : (el.querySelector('img, video') || el);
      const strength = parseFloat(el.dataset.parallax) || 0.12;
      return { el: target, strength };
    });

    let ticking = false;
    const applyParallax = () => {
      const vh = window.innerHeight;
      // Legacy : translate Y ±30px + scale 1.08
      legacyEls.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const translate = Math.max(-30, Math.min(30, progress * -20));
        img.style.transform = `translate3d(0, ${translate}px, 0) scale(1.08)`;
      });
      // Custom : amplitude proportionnelle à data-parallax
      customEls.forEach(({ el, strength }) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const translate = progress * -100 * strength;
        const baseScale = el.tagName === 'VIDEO' ? 1.05 : 1.04;
        el.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0) scale(${baseScale})`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }, { passive: true });
    applyParallax();
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq-card').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    const toggle = () => card.classList.toggle('is-open');
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  // ---------- Mobile nav ----------
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelector('.nav-links');
  if (nav && navLinks && !document.querySelector('.nav-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span class="nav-toggle-bars"><span></span><span></span><span></span></span>';
    nav.insertBefore(toggle, navLinks.nextSibling);
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggle.classList.remove('is-open');
    }));
  }

  // ---------- Lang dropdown open/close (works with existing JS) ----------
  const langWrap = document.querySelector('.lang-dropdown');
  const langBtn = document.querySelector('.lang-dropdown-toggle');
  if (langWrap && langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langWrap.classList.toggle('is-open');
    });
    document.addEventListener('click', (e) => {
      if (!langWrap.contains(e.target)) langWrap.classList.remove('is-open');
    });
  }

})();
